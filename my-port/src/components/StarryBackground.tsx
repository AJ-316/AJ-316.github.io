import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  twinkleOffset: number;
}

const NUM_STARS = 250;
const LAYERS = 3;

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const scrollY = useRef<number>(0);
  const dpr = window.devicePixelRatio || 1;

  // Create layered stars
  const createStars = (width: number, height: number) => {
    const stars: Star[] = [];

    for (let i = 0; i < NUM_STARS; i++) {
      const layer = i % LAYERS;
      const speed = 0.05 + layer * 0.05; // Slowest to fastest
      const radius = Math.random() * (1 + layer * 0.5) + 0.3;
      const opacity = 0.4 + layer * 0.2 + Math.random() * 0.3;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 3, // cover 3x scroll area
        radius,
        speed,
        opacity,
        twinkleOffset: Math.random() * 100,
      });
    }

    return stars;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any existing transforms
      ctx.scale(dpr, dpr);

      starsRef.current = createStars(width, document.documentElement.scrollHeight);
    };

    resizeCanvas();

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      for (const star of starsRef.current) {
        const y = star.y - scrollY.current * star.speed;

        // Only draw stars within the current viewport
        if (y < -10 || y > height + 10) continue;

        const twinkle =
          star.opacity * (0.5 + 0.5 * Math.sin((now / 1000) + star.twinkleOffset));

        ctx.beginPath();
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 2;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", onScroll);
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
    />
  );
};

export default StarryBackground;
