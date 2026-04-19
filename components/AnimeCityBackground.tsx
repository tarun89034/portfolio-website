"use client";
import { useEffect, useRef } from "react";

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  twinkleSpeed: number;
  phase: number;
}

interface Cloud {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  alpha: number;
}

export default function AnimeCityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Stars
    const stars: Star[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.7,
      r: Math.random() * 1.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    // Comets
    const comets: Comet[] = [];
    const spawnComet = () => {
      const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 6 + 4;
      comets.push({
        x: Math.random() * W * 0.5,
        y: Math.random() * H * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 120 + 60,
        alpha: 0,
        life: 0,
        maxLife: Math.random() * 100 + 80,
      });
    };

    // Clouds
    const clouds: Cloud[] = Array.from({ length: 5 }, (_, i) => ({
      x: (i / 5) * W * 1.5 - W * 0.2,
      y: H * (0.15 + Math.random() * 0.2),
      w: Math.random() * 200 + 150,
      h: Math.random() * 40 + 20,
      speed: Math.random() * 0.15 + 0.05,
      alpha: Math.random() * 0.12 + 0.04,
    }));

    let t = 0;
    let lastComet = 0;

    const drawSkyGradient = () => {
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#040710");
      grad.addColorStop(0.3, "#080d1a");
      grad.addColorStop(0.6, "#0c1428");
      grad.addColorStop(0.8, "#0f1830");
      grad.addColorStop(1, "#14203a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    };

    const drawAurora = () => {
      ctx.save();
      const aGrad = ctx.createLinearGradient(0, 0, W, H * 0.5);
      aGrad.addColorStop(0, "rgba(108, 140, 255, 0.04)");
      aGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.06)");
      aGrad.addColorStop(1, "transparent");
      ctx.fillStyle = aGrad;
      ctx.fillRect(0, 0, W, H * 0.5);
      ctx.restore();
    };

    const drawStars = () => {
      stars.forEach((s) => {
        const brightness = 0.4 + 0.6 * Math.sin(t * s.twinkleSpeed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        // Glowing star
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
        const isBlue = Math.random() < 0.1;
        const starColor = isBlue ? `rgba(108, 140, 255, ${brightness})` : `rgba(230, 235, 255, ${brightness})`;
        grd.addColorStop(0, starColor);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawComets = () => {
      comets.forEach((c, i) => {
        c.life++;
        c.x += c.vx;
        c.y += c.vy;
        c.alpha = c.life < 20 ? c.life / 20 : c.life > c.maxLife - 20 ? (c.maxLife - c.life) / 20 : 1;

        const tx = c.x - c.vx * (c.len / Math.sqrt(c.vx * c.vx + c.vy * c.vy));
        const ty = c.y - c.vy * (c.len / Math.sqrt(c.vx * c.vx + c.vy * c.vy));

        const grad = ctx.createLinearGradient(tx, ty, c.x, c.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.7, `rgba(180, 200, 255, ${c.alpha * 0.3})`);
        grad.addColorStop(1, `rgba(240, 248, 255, ${c.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        const headGlow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 8);
        headGlow.addColorStop(0, `rgba(200, 220, 255, ${c.alpha * 0.9})`);
        headGlow.addColorStop(1, "transparent");
        ctx.fillStyle = headGlow;
        ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
        ctx.fill();

        if (c.life >= c.maxLife) comets.splice(i, 1);
      });
    };

    const drawClouds = () => {
      clouds.forEach((c) => {
        c.x += c.speed;
        if (c.x > W + c.w) c.x = -c.w;
        ctx.save();
        ctx.globalAlpha = c.alpha;
        const cg = ctx.createRadialGradient(c.x + c.w / 2, c.y, 0, c.x + c.w / 2, c.y, c.w / 2);
        cg.addColorStop(0, "rgba(140, 160, 220, 0.8)");
        cg.addColorStop(1, "transparent");
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.ellipse(c.x + c.w / 2, c.y, c.w / 2, c.h, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const drawMoon = () => {
      const mx = W * 0.8, my = H * 0.15, mr = 45;
      // Outer glow
      const moonGlow = ctx.createRadialGradient(mx, my, mr * 0.8, mx, my, mr * 3);
      moonGlow.addColorStop(0, "rgba(200, 220, 255, 0.15)");
      moonGlow.addColorStop(1, "transparent");
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(mx, my, mr * 3, 0, Math.PI * 2);
      ctx.fill();

      // Moon body
      const moonBody = ctx.createRadialGradient(mx - 10, my - 10, 5, mx, my, mr);
      moonBody.addColorStop(0, "rgba(220, 230, 255, 0.95)");
      moonBody.addColorStop(0.6, "rgba(180, 200, 255, 0.85)");
      moonBody.addColorStop(1, "rgba(140, 165, 230, 0.7)");
      ctx.fillStyle = moonBody;
      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, Math.PI * 2);
      ctx.fill();

      // Crescent shadow
      ctx.fillStyle = "rgba(8, 13, 26, 0.85)";
      ctx.beginPath();
      ctx.arc(mx + 12, my - 5, mr * 0.85, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawCitySkyline = () => {
      const groundY = H;
      const skylineH = H * 0.35;
      const skylineY = groundY - skylineH;

      // Background city glow
      const cityGlow = ctx.createLinearGradient(0, skylineY + skylineH * 0.3, 0, groundY);
      cityGlow.addColorStop(0, "transparent");
      cityGlow.addColorStop(0.4, "rgba(108, 140, 255, 0.05)");
      cityGlow.addColorStop(1, "rgba(80, 100, 200, 0.12)");
      ctx.fillStyle = cityGlow;
      ctx.fillRect(0, skylineY, W, skylineH);

      // Draw buildings
      const buildings = [
        // Far background (lighter)
        { x: 0, w: 80, h: 0.45, color: "rgba(30, 35, 65, 0.8)" },
        { x: 70, w: 60, h: 0.55, color: "rgba(25, 30, 60, 0.85)" },
        { x: 120, w: 100, h: 0.4, color: "rgba(28, 33, 62, 0.8)" },
        { x: 200, w: 70, h: 0.65, color: "rgba(22, 27, 58, 0.9)" },
        { x: 250, w: 50, h: 0.5, color: "rgba(30, 35, 65, 0.8)" },
        { x: 280, w: 90, h: 0.7, color: "rgba(20, 25, 55, 0.95)" },
        { x: 350, w: 60, h: 0.45, color: "rgba(28, 33, 62, 0.8)" },
        { x: 390, w: 80, h: 0.6, color: "rgba(22, 27, 58, 0.9)" },
        { x: 450, w: 110, h: 0.75, color: "rgba(18, 23, 52, 1)" },
        { x: 530, w: 55, h: 0.5, color: "rgba(25, 30, 60, 0.85)" },
        { x: 560, w: 75, h: 0.55, color: "rgba(30, 35, 65, 0.8)" },
        { x: 620, w: 90, h: 0.65, color: "rgba(20, 25, 55, 0.95)" },
        { x: 680, w: 65, h: 0.45, color: "rgba(28, 33, 62, 0.8)" },
        { x: 730, w: 120, h: 0.8, color: "rgba(16, 21, 50, 1)" },
        { x: 820, w: 70, h: 0.5, color: "rgba(25, 30, 60, 0.85)" },
        { x: 870, w: 85, h: 0.6, color: "rgba(22, 27, 58, 0.9)" },
        { x: 930, w: 100, h: 0.55, color: "rgba(28, 33, 62, 0.8)" },
        { x: 1000, w: 80, h: 0.7, color: "rgba(20, 25, 55, 0.95)" },
        { x: 1060, w: 60, h: 0.45, color: "rgba(30, 35, 65, 0.8)" },
        { x: 1100, w: 140, h: 0.85, color: "rgba(14, 19, 48, 1)" },
        { x: 1200, w: 75, h: 0.5, color: "rgba(25, 30, 60, 0.85)" },
        { x: 1250, w: 90, h: 0.6, color: "rgba(22, 27, 58, 0.9)" },
        { x: W - 100, w: 100, h: 0.4, color: "rgba(30, 35, 65, 0.8)" },
        { x: W - 160, w: 80, h: 0.55, color: "rgba(25, 30, 60, 0.85)" },
      ];

      // Scale to screen width
      const scale = W / 1400;

      buildings.forEach((b) => {
        const bx = b.x * scale;
        const bw = b.w * scale;
        const bh = skylineH * b.h;
        const by = groundY - bh;

        ctx.fillStyle = b.color;
        ctx.fillRect(bx, by, bw, bh);

        // Windows
        const winCols = Math.floor(bw / (8 * scale));
        const winRows = Math.floor(bh / (14 * scale));
        for (let r = 0; r < winRows; r++) {
          for (let c = 0; c < winCols; c++) {
            if (Math.random() > 0.35) {
              const wx = bx + c * (8 * scale) + 2 * scale;
              const wy = by + r * (14 * scale) + 4 * scale;
              const ww = 3 * scale;
              const wh = 5 * scale;
              const lit = Math.random();
              if (lit > 0.4) {
                const alpha = 0.3 + Math.sin(t * 0.01 + r * 0.7 + c * 0.3) * 0.1;
                const colors = [
                  `rgba(255, 240, 180, ${alpha})`,
                  `rgba(180, 200, 255, ${alpha})`,
                  `rgba(220, 180, 255, ${alpha * 0.6})`,
                ];
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillRect(wx, wy, ww, wh);
              }
            }
          }
        }
      });

      // Ground/street reflection
      const streetGrad = ctx.createLinearGradient(0, groundY - 30, 0, groundY);
      streetGrad.addColorStop(0, "rgba(108, 140, 255, 0.15)");
      streetGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.08)");
      streetGrad.addColorStop(1, "rgba(8, 13, 26, 1)");
      ctx.fillStyle = streetGrad;
      ctx.fillRect(0, groundY - 30, W, 30);
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      drawSkyGradient();
      drawAurora();
      drawStars();
      drawMoon();
      drawClouds();
      drawComets();
      drawCitySkyline();

      if (t - lastComet > 180 + Math.random() * 240) {
        spawnComet();
        lastComet = t;
      }

      t++;
      requestAnimationFrame(loop);
    };

    const raf = requestAnimationFrame(loop);

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
