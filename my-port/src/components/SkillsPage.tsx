import { hover, motion } from "framer-motion";
import SkillsWeb, { HoveredCard, Point } from "./SkillsWeb";
import SkillsWebList from "./SkillsWebList";
import { useEffect, useRef, useState } from "react";

type SkillCard = {
    name: string;
    description: string;
};

const SkillsPage = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pointsRef = useRef<Point[]>([]);
    const [hoveredCard, setHoveredCard] = useState<HoveredCard | null>(null);

    const [shuffledSkills, setShuffledSkills] = useState<SkillCard[]>([]);

    const originalSkillsList: SkillCard[] = ([
        {
            name: "JavaScript",
            description: "My primary language for building dynamic web apps, handling client-side logic, and integrating with backends."
        },
        {
            name: "TypeScript",
            description: "I use TypeScript to bring strong typing and better tooling to my JavaScript projects, reducing bugs and improving maintainability."
        },
        {
            name: "React",
            description: "My go-to library for building responsive, interactive UIs with reusable components and modern state management."
        },
        {
            name: "Python",
            description: "I work with Python for scripting, automation, data analysis, and experimenting with machine learning models."
        },
        {
            name: "Tailwind CSS",
            description: "I use Tailwind for quickly styling web interfaces with utility classes, ensuring consistency and fast design iterations."
        },
        {
            name: "Machine Learning",
            description: "I built AI modules using visual input from cameras to recognize hand gestures, control presentations, and interpret sign language with trained models."
        },
        {
            name: "OpenGL",
            description: "I leverage OpenGL to render 2D and 3D graphics, often in game development or for experimenting with visual effects and simulations."
        },
        {
            name: "MySQL",
            description: "I use MySQL for designing and managing relational databases, writing optimized queries, and ensuring data integrity."
        },
        {
            name: "Java",
            description: "I develop desktop applications, backend services, and sometimes use Java for cross-platform solutions or academic projects."
        },
        {
            name: "C",
            description: "I write C for systems programming, understanding low-level memory management, and building performance-critical applications."
        },
        {
            name: "C++",
            description: "I apply C++ in areas like game development and high-performance applications, leveraging object-oriented and low-level features."
        },
        {
            name: "C#",
            description: "I code in C# for developing desktop apps and game development, especially when working with engines like Unity."
        },
        {
            name: "HLSL",
            description: "I use HLSL to write custom shaders for real-time graphics and post-processing effects in graphics pipelines."
        },
        {
            name: "GLSL",
            description: "I work with GLSL to program shaders directly in OpenGL, enabling custom rendering logic and advanced visual effects."
        },
    ]);

    useEffect(() => {
        const copy = [...originalSkillsList];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        setShuffledSkills(copy);
    }, []);

    const setHoverStatus = (id: number | null, x?: number, y?: number) => {
        if (!pointsRef.current) return;

        let found = false;

        pointsRef.current = pointsRef.current.map(point => {
            const isHovering = id !== null && point.skillID === id;
            if (isHovering) {
                console.log(id)
                found = true; // Ensure only the first match gets updated
            }
            return {
                ...point,
                isHovered: isHovering,
                targetRadius: isHovering ? point.originalRadius * 1.8 : point.originalRadius,
            };
        });

        const rect = canvasRef.current?.getBoundingClientRect();
        setHoveredCard(found && rect ? {
            card: shuffledSkills[id!],
            x: x ?? (pointsRef.current.find(p => p.skillID === id)?.x ?? 0) + rect.left,
            y: y ?? (pointsRef.current.find(p => p.skillID === id)?.y ?? 0) + rect.top,
        } : null);
    }

    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={containerRef} className="relative">
            <div className="flex justify-center items-center">
                <motion.h1
                    className="text-white px-10 p-5"
                    initial={{ y: 25, opacity: 0 }}
                    viewport={{ once: false }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "spring", damping: 8 }}
                >
                    <p className="shine-text text-[1rem] underline-animate">Mapping my skills, one connection at a time</p>
                </motion.h1>
            </div>
            <div className="flex items-center justify-center w-full">
                <SkillsWebList
                    skillsList={shuffledSkills}
                    onSkillActive={(i) => setHoverStatus(i)}
                    hoveredCard={hoveredCard}
                    containerRef={containerRef}
                />
                {shuffledSkills.length > 0 &&
                    <SkillsWeb
                        totalSkills={shuffledSkills.length}
                        pointsRef={pointsRef}
                        setHoverStatus={setHoverStatus}
                        hoveredCard={hoveredCard}
                        canvasRef={canvasRef}
                    />}

            </div>

        </div>
    );
};

export default SkillsPage;
