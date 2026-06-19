import React, { useEffect, useRef } from 'react';

interface Confetti {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  swayTime: number;
  swaySpeed: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  timer: number;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Confetti[] = [];
    let sparkles: Sparkle[] = [];
    let breathingTime = 0;
    let animationFrameId: number;

    const colors = [
      '#f43f5e', // deep sparkling pink
      '#ec4899', // bright pink
      '#d946ef', // radiant purple
      '#a855f7', // soft amethyst 
      '#3b82f6', // sky energetic blue
      '#06b6d4', // deep cyan
      '#10b981', // meadow emerald
      '#f59e0b', // sunset orange
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      sparkles = [];
      
      // Seed initial confetti spread across the screen
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < Math.min(count, 120); i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          width: Math.random() * 6 + 5,
          height: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          speedY: Math.random() * 1.2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.5,
          swayTime: Math.random() * 100,
          swaySpeed: Math.random() * 0.02 + 0.01,
        });
      }

      // Initialize sweet little blinking star sparkles
      const sparkleCount = Math.floor((canvas.width * canvas.height) / 6000);
      for (let i = 0; i < sparkleCount; i++) {
        sparkles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.6 + 0.8, // Elegant minor star sizes
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.012 + 0.003,
          timer: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawBackground = () => {
      // Linear layout mimicking a pristine cosmic dark sky gradient matching Ishu's preferences
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#070410');   // Midnight space dark
      gradient.addColorStop(0.3, '#0c061d'); // Deep cosmos void
      gradient.addColorStop(0.65, '#130825'); // Celestial nebula violet
      gradient.addColorStop(1, '#08040e');   // Grounding dark slate glow
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      drawBackground();

      // Slow, rhythmic respiration timing for global star breathe
      breathingTime += 0.008;
      const breathingWave = Math.sin(breathingTime) * 0.35 + 0.65; // Cycles gracefully between 0.30 and 1.00

      // Render & Update Sparkles
      sparkles.forEach((s) => {
        s.timer += s.twinkleSpeed;
        
        // Base twinkling pattern with a smooth sinusoid
        const individualTwinkle = 0.4 + 0.6 * Math.sin(s.timer);
        
        // Combine collective gentle breath with individual twinkle to form breathing layered space depth
        const finalOpacity = Math.max(0.05, Math.min(1.0, individualTwinkle * breathingWave));

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.fillStyle = `rgba(255, 244, 250, ${finalOpacity})`;
        
        // Draw 4-point star flare
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.rotate(Math.PI / 2);
          ctx.lineTo(0, s.size * 2);
          ctx.lineTo(s.size * 0.25, 0);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Loop sparkles back if window is resized
        if (s.x > canvas.width) s.x = Math.random() * canvas.width;
        if (s.y > canvas.height) s.y = Math.random() * canvas.height;
      });

      // Render & Update Confetti particles
      particles.forEach((p) => {
        // Update physics
        p.y += p.speedY;
        p.swayTime += p.swaySpeed;
        p.x += Math.sin(p.swayTime) * 0.4 + p.speedX;
        p.rotation += p.rotationSpeed;

        // Loop back up if fallen below screen
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.speedY = Math.random() * 1.2 + 0.8;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // Draw confetti rectangle with shadow/glow
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="confetti-celebrative-canvas"
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full block z-0 select-none pointer-events-none"
    />
  );
};
