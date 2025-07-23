import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import SkillsWebCard from "./SkillsWebCard";
import { AnimatePresence, m, motion } from "framer-motion";

export type Point = {
    skillID: number;
    x: number;
    y: number;
    isHovered: boolean;

    // translate ease
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    progress: number;

    // random movement
    dx: number;
    dy: number;
    mx: number;
    my: number;

    // scale ease
    radius: number;
    originalRadius: number;
    targetRadius: number;
};

type Dimensions = {
    width: number,
    height: number,
};

type SkillCard = {
    name: string;
    description: string;
};

export type HoveredCard = {
    card: SkillCard;
    x: number;
    y: number;
}

interface SkillsWebProps {
    totalSkills: number;
    pointsRef: React.RefObject<Point[]>;
    setHoverStatus: (id: number | null, x?: number, y?: number) => (void);
    hoveredCard: HoveredCard | null;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const SkillsWeb = ({ totalSkills, pointsRef, setHoverStatus, hoveredCard, canvasRef }: SkillsWebProps) => {
    const animationRef = useRef<number | null>(null);
    //const pointsRef = useRef<Point[]>([]);
    const dimensions = useRef<Dimensions>({ width: window.innerWidth, height: window.innerHeight });
    //const [hoveredCard, setHoveredCard] = useState<HoveredCard | null>(null);

    const initializePoints = (prevPoints?: Point[]): Point[] => {
        const width = dimensions.current.width
        const height = dimensions.current.height
        return Array.from({ length: 30 }, (_, i) => {
            const rFactor = width * 0.003;
            const r = Math.random() * rFactor + Math.random() * rFactor + Math.random() * rFactor;

            const oldPoint = prevPoints ? prevPoints[i] : null;

            const newX = Math.random() * (width * 0.8) + (width * 0.1);
            const newY = Math.random() * (height * 0.8) + (height * 0.1);

            return {
                skillID: -1,
                x: oldPoint ? oldPoint.x : newX,
                y: oldPoint ? oldPoint.y : newY,
                startX: oldPoint ? oldPoint.x : newX,
                startY: oldPoint ? oldPoint.y : newY,
                endX: newX,
                endY: newY,
                progress: 0,
                radius: r,
                originalRadius: r,
                targetRadius: r,
                dx: Math.random() - 0.5,
                dy: Math.random() - 0.5,
                mx: 0,
                my: 0,
                isHovered: false,
            };
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx) return;

        function draw() {
            if (!canvasRef.current || !ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update interpolation progress
            pointsRef.current.forEach((point) => {
                if (point.progress < 1) {
                    point.progress += 0.02; // Adjust speed of transition
                    point.x = point.startX + (point.endX - point.startX) * point.progress;
                    point.y = point.startY + (point.endY - point.startY) * point.progress;
                }
            });

            const maxConnections = 2;
            const maxExtraConnections = 10;
            // Draw lines between points
            pointsRef.current.forEach((p1, i) => {
                // Sort other points by distance
                const sortedPoints = pointsRef.current
                    .filter(p2 => p1 !== p2) // Exclude itself
                    .map(p2 => ({ p2, dist: Math.hypot(p2.x - p1.x, p2.y - p1.y) }))
                    .sort((a, b) => a.dist - b.dist); // Sort by closest first

                sortedPoints.forEach(({ p2, dist }, index) => {
                    let baseOpacity = Math.max(0, Math.min(Math.max(dimensions.current.width * 0.00035, 0.15), 0.8) - dist / 1000);

                    if (index >= maxConnections) {
                        const fadeFactor = 1 - ((index - maxConnections) / (maxExtraConnections - maxConnections));
                        baseOpacity *= Math.max(fadeFactor, 0); // Gradually fade out
                    }

                    ctx.strokeStyle = `rgba(255, 255, 255, ${baseOpacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                });
            });
            // Animate and draw points
            pointsRef.current.forEach((point) => {
                if (!point.isHovered) {
                    const movementFactor = 0.05; // Control range of movement
                    point.mx += point.dx / 50;
                    point.my += point.dy / 50;

                    // Apply repulsion force to avoid collisions
                    pointsRef.current.forEach(other => {
                        if (other !== point) {
                            const dist = Math.hypot(point.x - other.x, point.y - other.y);
                            const minDist = point.radius + other.radius + dimensions.current.width * 0.02; // Safe distance

                            if (dist < minDist) {
                                // Push apart
                                const angle = Math.atan2(point.y - other.y, point.x - other.x);
                                const force = (minDist - dist) * 0.02; // Repulsion force

                                point.x += Math.cos(angle) * force;
                                point.y += Math.sin(angle) * force;
                                other.x -= Math.cos(angle) * force;
                                other.y -= Math.sin(angle) * force;
                            }
                        }
                    });


                    point.x = Math.max(
                        Math.min(point.x + Math.sin(point.mx) * movementFactor, dimensions.current.width - dimensions.current.width * 0.1),
                        dimensions.current.width * 0.1
                    );

                    point.y = Math.max(
                        Math.min(point.y + Math.sin(point.my) * movementFactor, dimensions.current.height - dimensions.current.height * 0.1),
                        dimensions.current.height * 0.1
                    );
                } else {
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, point.radius * 0.2, 0, Math.PI * 2);
                    ctx.fillStyle = "cyan"; // Color change for hover
                    ctx.fill();
                }

                point.radius += (point.targetRadius - point.radius) * 0.15;

                ctx.beginPath();
                ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);

                const rgb = getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-interact')
                    .trim();

                const interactTransparent = `rgba(${rgb},0.6)`;
                const interact = `rgb(${rgb})`;
                ctx.fillStyle = point.isHovered ? "#00000000" : point.skillID < 0 ? "#ffffff55" : interactTransparent; // Color change for hover
                ctx.strokeStyle = point.isHovered ? interact : point.skillID < 0 ? "white" : interact;

                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(draw);
        }

        handleResize();
        pointsRef.current = assignSkillIds(initializePoints());
        animationRef.current = requestAnimationFrame(draw);
        window.addEventListener("resize", handleResize);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas?.getContext("2d");
        const dpr = Math.max(window.devicePixelRatio, 1);

        dimensions.current = { width: window.innerWidth / 1.5, height: window.innerHeight / 1.5 };
        canvas.width = dimensions.current.width * dpr;
        canvas.height = dimensions.current.height * dpr;
        canvas.style.width = `${dimensions.current.width}px`;
        canvas.style.height = `${dimensions.current.height}px`;
        if (ctx) {
            ctx.resetTransform();
            ctx.scale(dpr, dpr);
        }

        const oldPoints = [...pointsRef.current];

        pointsRef.current = assignSkillIds(initializePoints(oldPoints));
    };

    const assignSkillIds = (points: Point[]) => {
        const shuffledIds = [...Array(totalSkills).keys()].sort(() => Math.random() - 0.5);
        let assignedCount = 0;
        const assignedPoints: Point[] = []; // Track assigned points
        const minDist = dimensions.current.width * 0.5;
        return points.map((point, i) => {
            if (assignedCount >= totalSkills) return { ...point, id: -1 }; // No ID if more points than skills

            let newX = 0, newY = 0, valid = false;
            let attempts = 0;

            // Assign skill and store assigned point
            const rFactor = dimensions.current.width * 0.005;
            const newRadius = Math.random() * rFactor + Math.random() * rFactor + Math.random() * rFactor + dimensions.current.width * 0.006;

            while (!valid && attempts < 500) {
                newX = Math.random() * (dimensions.current.width * 0.8) + (dimensions.current.width * 0.1);
                newY = Math.random() * (dimensions.current.height * 0.8) + (dimensions.current.height * 0.1);

                // Check only against already assigned points
                valid = assignedPoints.every(p =>
                    Math.hypot(newX - p.x, newY - p.y) > (minDist + p.radius * 2 + newRadius * 2)
                );

                attempts++;
            }

            const newPoint = {
                ...point,
                x: newX,
                y: newY,
                skillID: shuffledIds[assignedCount++], // Assign skill ID
                radius: newRadius,
                originalRadius: newRadius,
                targetRadius: newRadius
            };

            assignedPoints.push(newPoint);
            return newPoint;
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!canvasRef.current) return;
        // relative to viewport
        const rect = canvasRef.current.getBoundingClientRect();

        // Scale mouse coordinates correctly to match high-DPI canvas
        const mouseX = (e.clientX - rect.left)
        const mouseY = (e.clientY - rect.top)
        setHoverStatus(null);

        pointsRef.current.forEach((point) => {
            if (point.skillID >= 0 && Math.hypot(mouseX - point.x, mouseY - point.y) < Math.max(point.radius, 10)) {
                console.log("Mouse:", mouseX, mouseY, "e.client:", e.clientX, e.clientY, "point:", point.x, point.y)
                setHoverStatus(point.skillID, e.clientX, e.clientY);
                return;
            }
        });
    };

    return (
        <div className="pr-0">
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseMove}
                className="w-full h-screen transition-opacity duration-1000" />

            <AnimatePresence mode="wait">
                {hoveredCard &&
                    <SkillsWebCard
                        key={hoveredCard.card.name}
                        skillCardProp={({
                            name: hoveredCard.card.name,
                            description: hoveredCard.card.description,
                            x: hoveredCard.x,
                            y: hoveredCard.y,
                        })}
                    />
                }
            </AnimatePresence>

        </div>
    );
};
export default SkillsWeb;