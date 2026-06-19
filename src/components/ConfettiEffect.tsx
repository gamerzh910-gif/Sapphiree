import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';

export interface ConfettiEffectRef {
  triggerBlast: (x?: number, y?: number) => void;
  triggerFirework: (x?: number, y?: number) => void;
}

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  drag: number;
  opacity: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  gravity: number;
  drag: number;
  life: number;
  maxLife: number;
  opacity: number;
}

interface FireworkShell {
  x: number;
  y: number;
  tx: number; // target x
  ty: number; // target y
  vx: number;
  vy: number;
  color: string;
  size: number;
}

interface ConfettiEffectProps {
  continuousFireworks?: boolean;
}

export const ConfettiEffect = forwardRef<ConfettiEffectRef, ConfettiEffectProps>(
  ({ continuousFireworks = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<ConfettiParticle[]>([]);
    const sparksRef = useRef<SparkParticle[]>([]);
    const shellsRef = useRef<FireworkShell[]>([]);
    const activeRef = useRef<boolean>(true);

    const colors = [
      '#f43f5e', // rose
      '#ec4899', // pink
      '#d946ef', // fuchsia
      '#8b5cf6', // violet
      '#3b82f6', // blue
      '#06b6d4', // cyan
      '#10b981', // emerald
      '#f59e0b', // amber
    ];

    const initCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, []);

    // Create a burst of confetti expanding from a point (default center)
    const triggerBlast = useCallback((startX?: number, startY?: number) => {
      const x = startX !== undefined ? startX : window.innerWidth / 2;
      const y = startY !== undefined ? startY : window.innerHeight * 0.65;
      const count = 120;
      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];

      const newParticles: ConfettiParticle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 18;
        newParticles.push({
          x,
          y,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - (Math.random() * 3 + 1), // bias slightly upwards
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.25,
          gravity: 0.18 + Math.random() * 0.1,
          drag: 0.96 + Math.random() * 0.02,
          opacity: 1,
        });
      }
      particlesRef.current = [...particlesRef.current, ...newParticles];
    }, [colors]);

    // Create a dazzling firework explosion
    const triggerFirework = useCallback((x: number, y: number, fireworkColor?: string) => {
      const sparkCount = 80;
      const chosenColor = fireworkColor || colors[Math.floor(Math.random() * colors.length)];
      const newSparks: SparkParticle[] = [];

      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 10;
        const maxLife = 60 + Math.random() * 40;
        newSparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: chosenColor,
          size: 1.5 + Math.random() * 2,
          gravity: 0.06,
          drag: 0.95 + Math.random() * 0.02,
          life: 0,
          maxLife,
          opacity: 1,
        });
      }
      sparksRef.current = [...sparksRef.current, ...newSparks];
    }, [colors]);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      triggerBlast,
      triggerFirework,
    }));

    useEffect(() => {
      initCanvas();
      window.addEventListener('resize', initCanvas);
      activeRef.current = true;

      // Automatically do a soft opening splash
      setTimeout(() => {
        triggerBlast(window.innerWidth / 4, window.innerHeight * 0.4);
        triggerBlast((window.innerWidth * 3) / 4, window.innerHeight * 0.4);
      }, 1000);

      let lastSpawn = 0;

      // Render loop
      const draw = (now: number) => {
        if (!activeRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // --- Continuous Fireworks logic ---
        if (continuousFireworks && now - lastSpawn > 800) {
          lastSpawn = now;
          // Spawn rising firework shell
          const startX = 100 + Math.random() * (canvas.width - 200);
          const targetY = 100 + Math.random() * (canvas.height * 0.45);
          const launchDuration = 45; // steps

          shellsRef.current.push({
            x: startX,
            y: canvas.height,
            tx: startX + (Math.random() - 0.5) * 160,
            ty: targetY,
            vx: (startX - startX) / launchDuration,
            vy: (targetY - canvas.height) / launchDuration,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 3,
          });
        }

        // --- Update and Draw Fireworks Shells (Rising stage) ---
        shellsRef.current = shellsRef.current.filter((shell) => {
          // Draw shell spark trail
          ctx.beginPath();
          ctx.fillStyle = shell.color;
          ctx.arc(shell.x, shell.y, shell.size, 0, Math.PI * 2);
          ctx.fill();

          // Trail sparks
          if (Math.random() < 0.4) {
            sparksRef.current.push({
              x: shell.x,
              y: shell.y,
              vx: (Math.random() - 0.5) * 1,
              vy: Math.random() * 2,
              color: 'rgba(255,180,60,0.8)',
              size: 1,
              gravity: 0.02,
              drag: 0.98,
              life: 0,
              maxLife: 20,
              opacity: 0.8,
            });
          }

          // Move
          shell.x += shell.vx;
          shell.y += shell.vy;

          // Explode check
          if (shell.y <= shell.ty) {
            triggerFirework(shell.x, shell.y, shell.color);
            return false; // remove shell
          }
          return true;
        });

        // --- Update and Draw Sparks ---
        sparksRef.current = sparksRef.current.filter((spark) => {
          spark.vy += spark.gravity;
          spark.vx *= spark.drag;
          spark.vy *= spark.drag;
          spark.x += spark.vx;
          spark.y += spark.vy;
          spark.life++;

          spark.opacity = 1 - spark.life / spark.maxLife;

          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = spark.color;
          ctx.globalAlpha = Math.max(0, spark.opacity);
          
          // Render sparkles as little diamonds or flares
          if (spark.life % 10 < 5) {
            ctx.arc(spark.x, spark.y, spark.size * 1.5, 0, Math.PI * 2);
          } else {
            ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
          }
          ctx.fill();
          ctx.restore();

          return spark.life < spark.maxLife;
        });

        // --- Update and Draw Confetti ---
        particlesRef.current = particlesRef.current.filter((p) => {
          p.vy += p.gravity;
          p.vx *= p.drag;
          p.vy *= p.drag;
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;
          p.opacity -= 0.007;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);

          ctx.beginPath();
          if (p.shape === 'circle') {
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          } else if (p.shape === 'triangle') {
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(p.size / 2, p.size / 2);
            ctx.lineTo(-p.size / 2, p.size / 2);
            ctx.closePath();
          } else {
            // square
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          }
          ctx.fill();
          ctx.restore();

          return p.opacity > 0 && p.y < canvas.height + 20;
        });

        requestAnimationFrame(draw);
      };

      const animationFrameId = requestAnimationFrame(draw);

      return () => {
        activeRef.current = false;
        window.removeEventListener('resize', initCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }, [continuousFireworks, initCanvas, triggerBlast, triggerFirework]);

    return (
      <canvas
        id="confetti-canvas"
        ref={canvasRef}
        className="fixed inset-0 w-full h-full block pointer-events-none z-50"
      />
    );
  }
);

ConfettiEffect.displayName = 'ConfettiEffect';
