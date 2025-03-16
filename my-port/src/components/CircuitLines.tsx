import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const CircuitLines: React.FC = () => {
    const [paths, setPaths] = useState<string[]>([]);

    const getRandomF = (factor: number, offset: number) => {
        return Math.round(Math.random() * (Math.random()*factor) + (Math.random()*offset));
    }

    const getRandomSign = (prob = 0.5) => {
        return Math.random() > prob ? 1 : -1;
    }

    useEffect(() => {
        const generatePaths = (edge: number, yOffset: number, count: number) => {
            const newPaths: string[] = [];
            const x = edge < 0 ? 1000 : 0;
            let y = 0;

            for (let i = 0; i < count; i++) {
                let path = `m${x},${y}`;
                let currentX = x;
                let currentY = y;

                const dx = getRandomF(500, 200) * edge;
                const dy = getRandomF(300, 100);
                const dir = getRandomSign();

                path += ` h${dx} l${dy*edge},${dy * dir}`;
                currentX += dx + dy*edge;
                currentY += dy * dir;

                const segmentCount = 3;//Math.floor(Math.random() * 3) + 1;
                let lastDir = dir;

                for (let j = 0; j < segmentCount; j++) {
                    const extraDx = getRandomF(500, 200) * edge;
                    const extraDy = getRandomF(300, 100);
                    let extraDir = getRandomSign();

                    if (extraDir === lastDir) {
                        extraDir *= -1;
                    }
                    lastDir = extraDir;

                    path += ` h${extraDx} l${extraDy*edge},${extraDy * extraDir}`;
                    
                    const branchDx = getRandomF(500, 200) * edge;
                    const branchDy = getRandomF(300, 100);
                    let branchDir = getRandomSign();

                    if (branchDir === lastDir) {
                        branchDir *= getRandomSign();
                    }

                    path += ` M${currentX},${currentY} l${branchDy*edge},${branchDy * branchDir} h${branchDx}`;
                    currentX += extraDx + extraDy*edge;
                    currentY += extraDy * extraDir;
                    path += ` M${currentX},${currentY}`;
                }

                newPaths.push(path);
                console.log(`Path ${i + 1}: ${path}`);

                y += yOffset > 0 ? yOffset : Math.random() * yOffset*-1;
            }
            setPaths(prevPaths => [...prevPaths, ...newPaths]);
        };
        generatePaths(1, -200, 10);
        generatePaths(-1, 100, 10);
    }, []);

    return (
        <>
        {<svg viewBox="0 0 1000 1000">
            {
            paths.map((d, index) =>
                <motion.path 
                key={index} 
                d={d} 
                strokeDasharray={'10 5'}
                initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 5 * Math.random() + 3, delay: index, ease: "circIn", repeat: Infinity, repeatType: "reverse" }}
                stroke="cyan"
                strokeWidth={(Math.random() * 0.2).toFixed(1)}
                fill="none" />
            )}
        </svg>}
        </>
    );
};

export default CircuitLines;
