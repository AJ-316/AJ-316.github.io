import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type SkillCard = {
    name: string;
    description: string;
    x: number;
    y: number
};

type SkillCardProp = {
    skillCardProp: SkillCard
};

const SkillsWebCard = ({skillCardProp}: SkillCardProp) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const [skillCard, setSkillCard] = useState<SkillCard>(skillCardProp);
    const cardHeight = useRef(0);

    const [isHeightCalculated, setIsHeightCalculated] = useState(false);

    useEffect(() => {
        if (cardRef.current) {
            cardHeight.current = cardRef.current.offsetHeight + 50;
            setIsHeightCalculated(true);
        }
    }, []);

    useEffect(() => {
        setSkillCard(skillCardProp);
    }, [skillCardProp]);
    
    return (
        <motion.div
            ref={cardRef}
            style={{
                left: skillCard.x + window.scrollX > (window.innerWidth + window.scrollX)/2 ? 
                    skillCard.x + window.scrollX - 150 : 
                    skillCard.x + window.scrollX - 50,
                    
                top: skillCard.y + window.scrollY > (window.innerHeight)/2 + window.scrollY ? 
                    skillCard.y + window.scrollY - cardHeight.current : 
                    skillCard.y + window.scrollY + 50,

                visibility: isHeightCalculated ? "visible" : "hidden", // Hide until
            }}
            className="absolute w-[7.5rem] bg-transparent backdrop-blur-xs text-white p-3 rounded-md shadow-inner shadow-red-400 transition-opacity duration-0 z-[100]"
            initial={{scale:0, opacity:0 }}
            animate={{scale:1, opacity:1}}
            exit={{scale:0, opacity:0}}
            transition={{duration:0.2}}
        >
            <h1 className="text-[0.8rem]">
                {skillCard.name}
            </h1>
            <div className="div-separator-a" />
            <p className="text-[0.5rem] font-thin">
                {skillCard.description}
            </p>
        </motion.div>
    );
};
export default SkillsWebCard;