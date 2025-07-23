import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { HoveredCard } from "./SkillsWeb";
import { useMemo } from "react";

type SkillCard = {
    name: string;
    description: string;
};

interface SkillsListPorps {
    skillsList: SkillCard[];
    onSkillActive: (id: number | null) => (void)
    hoveredCard: HoveredCard | null;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const SkillsWebList: React.FC<SkillsListPorps> = ({ skillsList, onSkillActive, hoveredCard, containerRef }) => {

    const [relativePos, setRelativePos] = useState<{ x: number; y: number, w: number, h: number }>({ x: 0, y: 0, w: 0, h: 0 });

    useLayoutEffect(() => {
        if (!hoveredCard || !containerRef.current) return;

        const element = document.getElementById(hoveredCard.card.name + '-li');
        if (!element) return;

        const listItemRect = element.getBoundingClientRect();

        setRelativePos({
            x: listItemRect.left,
            y: listItemRect.top,
            w: listItemRect.width + 10,
            h: listItemRect.height + 4
        });
    }, [hoveredCard])

    return (
        <>
            <ul className="flex flex-wrap ml-5">
                {skillsList.map((s, index) => (
                    <motion.li
                        key={index}
                        id={s.name + '-li'}
                        className="flex-1/2 min-w-14 text-white text-[0.5rem] pb-1 pt-1 list-none select-none hover-text-animate"
                        onMouseMove={() => onSkillActive(index)}
                        onMouseLeave={() => onSkillActive(null)}
                    >
                        {s.name}

                    </motion.li>

                ))}
            </ul>

            {hoveredCard &&
                <svg className="absolute inset-0"
                    key={`${hoveredCard.card.name}`}
                    style={{
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // Ensures the SVG does not block mouse events
                        overflow: 'visible',
                    }}
                >
                    <defs>
                        <linearGradient id="line-g" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#ff6467", stopOpacity: 0 }} />
                            <stop offset="50%" style={{ stopColor: "#ff6467", stopOpacity: 0.5 }} />
                            <stop offset="100%" style={{ stopColor: "#0092b8", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>

                    <motion.path
                        d={`M${relativePos.x + window.scrollX},${relativePos.y - (containerRef.current ? containerRef.current.getBoundingClientRect().y : 0) /* + window.scrollY */} 
                        m${0}, ${relativePos.h}, h${relativePos.w}
                        l${hoveredCard.x - relativePos.w - relativePos.x},
                        ${hoveredCard.y - relativePos.h - relativePos.y}`}
                        strokeWidth={2}
                        stroke="url(#line-g)"
                        fill="none"

                        initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 0.5, ease: "circIn" }}

                    />
                </svg>}
        </>
    );
};
export default SkillsWebList;