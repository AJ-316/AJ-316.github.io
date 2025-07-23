import ProjectGrid from "./ProjectGrid";
import { motion } from "framer-motion";

const items = [
        {
            image: ["/byteboard-app-A.png", "/byteboard-app-B.png", "/byteboard.png"],
            title: "BYteBOard Desktop Application",
            altText: "BYteBOard",
            description: "BYteBOard QnA Forum for all sorts of organizations FullStack, Java-Swing, MySQL, Lightweight",
			size: 450,
            radius:300,
        },
        {
            image: ["/opengllogo.png"],
            title: "Game Engine Software Tool",
            altText: "Game Engine",
            description: "Game Engine with 2D & 3D rendering with addition to UI and Particles OpenGL(LWJGL), Java",
			size: 300,
            radius:250,
        },
        {
            image: ["/particalrush.png"],
            title: "Particle Rush",
            altText: "Particle Rush",
            description: "2D Chase Game Developed using Java-OpenGL(LWJGL) Game Engine",
			size: 450,
            radius:300,
        },
        {
            image: ["/2048_3D.png", "/2048_3D-B.png"],
            title: "2048",
            altText: "2048",
            description: "3D Puzzle Game Developed using Java-OpenGL(LWJGL) Game Engine",
			size: 250,
            radius:200,
        },
        {
            image: ["/tropicaldash.png"],
            title: "Tropical Rush",
            altText: "Tropical Rush",
            description: "2D Platformer Game Developed using Java-OpenGL(LWJGL) Game Engine",
			size: 450,
            radius:300,
        },
        {
            image: ["/cosmicgalaxy.png"],
            title: "Cosmic Galaxy",
            altText: "Cosmic Galaxy",
            description: "3D Space Exploration Game Developed using Java-OpenGL(LWJGL) Game Engine",
			size: 450,
            radius:300,
        },
        {
            image: ["/github.png"],
            title: "Visit GitHub",
            altText: "Full Stack Developer",
            description: null,
            url: "https://github.com/AJ-316",
            className: "text-center",
			size: 125,
            radius:50,
        },
];

const ProjectPage = () => {

    return (
        <div>
            <div className="flex justify-center items-center overflow-hidden">
                <motion.h1
                    className="text-white px-10 p-5"
                    initial={{ y: 25, opacity: 0 }}
                    viewport={{ once: false }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "spring", damping: 8 }}
                >
                    <p className="shine-text text-[1rem] underline-animate">Highlights from my development journey</p>
                </motion.h1>
            </div>
            <div className="mx-5">
                <ProjectGrid
                    items={items}
                    fadeOut={0.6}
                />
            </div>

        </div>
    );
};

export default ProjectPage;