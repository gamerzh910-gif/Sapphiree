/**
 * Web Audio API Synthesizer to play customizable sound effects and
 * an elegant music-box style "Happy Birthday" chime.
 * Handles browser audio restrictions by requiring user interaction to play.
 */

class AudioSynth {
  private ctx: AudioContext | null = null;
  private isPlayingChimes = false;
  private chimesTimeout: NodeJS.Timeout | null = null;

  private init() {
    if (!this.ctx) {
      // @ts-ignore
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a simple crisp "bubble pop" sound effect (for balloons or hearts)
  playPop() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }

  // Play a sweet celestial "sparkle" or "tada" sound for gift opening
  playCelebrateChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Play a quick arpeggio of positive clean notes (C5, E5, G5, C6)
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        const noteStart = now + idx * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.3);

        osc.start(noteStart);
        osc.stop(noteStart + 0.35);
      });
    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }

  // Play a soft paper card "swoosh" sound
  playFlip() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }

  // Play the full "Happy Birthday" melody on a cozy music box synthesizer
  playBirthdayMelody() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.isPlayingChimes) {
        this.stopChimes();
      }
      this.isPlayingChimes = true;

      const tempo = 0.45; // Beat duration in seconds
      const melody = [
        { note: 'G4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'A4', dur: 2 }, { note: 'G4', dur: 2 }, { note: 'C5', dur: 2 }, { note: 'B4', dur: 4 },
        { note: 'G4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'A4', dur: 2 }, { note: 'G4', dur: 2 }, { note: 'D5', dur: 2 }, { note: 'C5', dur: 4 },
        { note: 'G4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'G5', dur: 2 }, { note: 'E5', dur: 2 }, { note: 'C5', dur: 2 }, { note: 'B4', dur: 2 }, { note: 'A4', dur: 2 },
        { note: 'F5', dur: 1 }, { note: 'F5', dur: 1 }, { note: 'E5', dur: 2 }, { note: 'C5', dur: 2 }, { note: 'D5', dur: 2 }, { note: 'C5', dur: 4 }
      ];

      const noteFreqs: { [key: string]: number } = {
        'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
        'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99
      };

      const baseTime = this.ctx.currentTime;
      let timeOffset = 0.1;

      const scheduleNote = (freq: number, start: number, duration: number) => {
        if (!this.ctx || !this.isPlayingChimes) return;

        // Music box sound is simulated by layer oscillators
        // Fundamental frequency oscillator (Sine)
        const osc1 = this.ctx.createOscillator();
        // Warm sub-harmonic frequency oscillator (Triangle)
        const osc2 = this.ctx.createOscillator();
        
        const gainNode = this.ctx.createGain();

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, start);
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 1.5, start); // Fifth harmonic

        // Music Box envelope: instant attack, long exponential decay with slight vibrant vibration
        gainNode.gain.setValueAtTime(0, start);
        gainNode.gain.linearRampToValueAtTime(0.08, start + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration - 0.05);

        osc1.start(start);
        osc1.stop(start + duration);

        osc2.start(start);
        osc2.stop(start + duration);
      };

      melody.forEach((noteObj) => {
        const freq = noteFreqs[noteObj.note];
        const duration = noteObj.dur * tempo;
        scheduleNote(freq, baseTime + timeOffset, duration);
        timeOffset += duration;
      });

      // Reset isPlaying flag after song finishes
      this.chimesTimeout = setTimeout(() => {
        this.isPlayingChimes = false;
      }, timeOffset * 1000 + 500);

    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }

  stopChimes() {
    this.isPlayingChimes = false;
    if (this.chimesTimeout) {
      clearTimeout(this.chimesTimeout);
      this.chimesTimeout = null;
    }
  }
}

export const musicPlayer = new AudioSynth();
