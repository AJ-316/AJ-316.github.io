import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import type { MotionStyle, SpringOptions } from "framer-motion";
import { tr } from "framer-motion/client";
import { none } from "@tsparticles/engine";

interface TiltedCardProps {
    imageSrc: string[];
    altText?: string;
    toolTipText?: string;
    containerWidth?: number; // fixed width, e.g., 300 or "300px"
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    showTooltip?: boolean;
    overlayContent?: React.ReactNode;
    displayOverlayContent?: boolean;
    fadeOut?: number;
    clickUrl?: string | undefined;
    radius?: number;
    showBorder?: boolean;
    showViewButton?: boolean;
}

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2,
};

export default function TiltedCard({
    imageSrc,
    altText = "Tilted card image",
    containerWidth = 300, // px
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showMobileWarning = true,
    overlayContent = null,
    displayOverlayContent = false,
    fadeOut = 1,
    clickUrl = undefined,
    radius = 300,
    showTooltip = clickUrl || imageSrc.length > 1 ? true : false,
    toolTipText = clickUrl ? clickUrl : imageSrc.length > 1 ? "Click for More" : altText,
    showBorder = true,
    showViewButton = true,
}: TiltedCardProps) {
    const fadeRef = useRef<(HTMLDivElement)>(null);

    const [imageIndex, setImageIndex] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1,
    });

    const [lastY, setLastY] = useState(0);
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isCaptionVisible, setCaptionVisible] = useState(showTooltip);
    const [captionText, setCaptionText] = useState(toolTipText);

    const cardWidth = isTouchDevice ? Math.min(containerWidth * 1.2, 300) : containerWidth;

    useEffect(() => {
        setIsTouchDevice(('ontouchstart' in window) || navigator.maxTouchPoints > 0);
    }, []);

    useEffect(() => {
        const img = new Image();
        img.src = typeof imageSrc[imageIndex] === "string" ? imageSrc[imageIndex] : "";
        img.onload = () => { setAspectRatio(img.naturalWidth / img.naturalHeight); };
    }, [imageIndex, imageSrc]);

    const height = aspectRatio ? cardWidth / aspectRatio : "auto";

    const handleMoveColor = (e: React.PointerEvent) => {
        gsap.to(fadeRef.current, {
            opacity: 0,
            duration: 0.25,
            overwrite: true
        });
    };

    const handleLeaveColor = () => {
        gsap.to(fadeRef.current, {
            opacity: 1,
            duration: fadeOut,
            overwrite: true,
        });
    };

    const handleCardClick = () => {
        if (clickUrl) {
            window.open(clickUrl, "_blank", "noopener,noreferrer");
            return;
        }

        setImageIndex(i => i = (i + 1) % imageSrc.length);
    };

    function handleMoveTilt(e: React.MouseEvent<HTMLElement>) {
        if (isTouchDevice || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    const handleViewImage = () => {
        window.open(imageSrc[imageIndex], "_blank", "noopener,noreferrer");
    }

    function handleEnterTilt() {
        if (isTouchDevice) return;
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleLeaveTilt() {
        if (isTouchDevice) return;
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }
    
    return (
        <motion.figure
            className="select-none flex flex-col items-center justify-center transition-all duration-500 hover:z-[999]"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0, damping: 8 }}
            style={{
                '--tw-width': typeof cardWidth === "number" ? `${cardWidth}px` : cardWidth,
                '--tw-height': typeof height === "number" ? `${height}px` : height,
                width: 'var(--tw-width)',
                height: 'var(--tw-height)',
            } as React.CSSProperties}
        >
            <div
                ref={ref}
                className="relative w-full h-full"
                style={{ perspective: "500px" }}
                onPointerMove={handleMoveColor}
                onPointerLeave={handleLeaveColor}
                onClick={() => { handleCardClick() }}
                onMouseMove={handleMoveTilt}
                onMouseEnter={handleEnterTilt}
                onMouseLeave={handleLeaveTilt}
            >
                {showMobileWarning && (
                    <div className="absolute top-4 text-center text-sm block sm:hidden z-[3]">
                        This effect is not optimized for mobile. Check on desktop.
                    </div>
                )}

                <motion.div
                    className="group relative flex flex-col rounded-lg border-2 border-transparent transition-colors duration-300 cursor-pointer w-full h-full [transform-style:preserve-3d]
                        bg-[radial-gradient(rgb(var(--color-interact)),rgb(var(--color-interact)),rgb(var(--color-interact)),#00000000)]
                        shadow-2xl shadow-black"
                    style={
                        {
                            rotateX,
                            rotateY,
                            scale,
                            borderWidth: showBorder ? "2px" : "0px",
                            transformOrigin: "center center",
                            willChange: "transform",
                            "--spotlight-color": "rgba(255,255,255,0.2)",
                            "--r": `${radius}px`,
                        } as MotionStyle
                    }
                >

                    <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100 rounded-lg"
                        style={{
                            background:
                                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
                        }}
                    />

                    <motion.img
                        src={imageSrc[imageIndex]}
                        alt={altText}
                        className="absolute top-0 left-0 w-full h-full object-contain rounded-lg will-change-transform"
                        style={{
                            scale: 0.999, // subtle trick to avoid overflow during growth
                            transform: "translateZ(0.001px)",
                        }}
                    />

                    {displayOverlayContent && overlayContent && (
                        <motion.div className="absolute top-0 left-0 w-full h-full z-[2] will-change-transform [transform:translateZ(30px)]">
                            {overlayContent}
                        </motion.div>
                    )}

                    {/* view */}
                    {showViewButton && <div
                        className={`w-[1.2rem] rounded-[40%] absolute bg-[#00000080] border-0 border-[rgb(var(--color-interact))] hover:border-1 hover:bg-[rgba(var(--color-interact),0.4)] [transform:translateZ(31px)] transition-all top-0
                           ${isTouchDevice ? " m-4" : " m-2 right-0 opacity-0 group-hover:opacity-100"}`}
                        onClick={(e) => { e.stopPropagation(); handleViewImage() }}
                        onMouseEnter={() => { setCaptionVisible(true); setCaptionText("View") }}
                        onMouseLeave={() => { setCaptionVisible(showTooltip); setCaptionText(toolTipText) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 48 48" fill="rgba(var(--color-interact), 1)" aria-hidden="true" data-slot="icon">
                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                            <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd"></path>
                        </svg>

                    </div>}

                    {/* next */}
                    {isTouchDevice && (clickUrl || imageSrc.length > 1) &&
                        <div
                            className="w-[1.2rem] rounded-[40%] absolute m-4 bg-[#00000080] hover:bg-[rgba(var(--color-interact-dark), 0.6)] [transform:translateZ(31px)] transition-all top-0 right-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 48 48" fill="rgba(var(--color-interact), 0.6)" aria-hidden="true" data-slot="icon">
                                <path stroke="rgba(var(--color-interact), 0.6)" strokeWidth={4} fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    }

                    {!isTouchDevice &&
                        <>
                            <div
                                className="absolute inset-0 pointer-events-none z-30 rounded-lg"
                                style={{
                                    backdropFilter: "grayscale(1) brightness(0.78)",
                                    WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
                                    background: "rgba(0,0,0,0.001)",
                                    maskImage:
                                        "radial-gradient(circle var(--r, 150px) at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)",
                                    WebkitMaskImage:
                                        "radial-gradient(circle var(--r, 150px) at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)",
                                }}
                            />
                            <div
                                className="absolute inset-0 pointer-events-none transition-opacity duration-[0ms] z-40 rounded-lg"
                                ref={fadeRef}
                                style={{
                                    backdropFilter: "grayscale(1) brightness(0.78)",
                                    WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
                                    background: "rgba(0,0,0,0.001)",
                                    maskImage:
                                        "radial-gradient(circle var(--r, 150px) at var(--mouse-x) var(--mouse-y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)",
                                    WebkitMaskImage:
                                        "radial-gradient(circle var(--r, 150px) at var(--mouse-x) var(--mouse-y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)",
                                }}
                            />
                        </>
                    }
                </motion.div>

                {isCaptionVisible && (
                    <motion.figcaption
                        className="pointer-events-none absolute left-0 top-0 rounded-lg bg-[#00000080] border-1 px-[10px] py-[4px] text-[0.3rem] font-bold text-[rgb(var(--color-interact))] z-[100] hidden sm:block"
                        style={{
                            x,
                            y,
                            opacity,
                            rotate: rotateFigcaption,
                        }}
                    >
                        {captionText}
                    </motion.figcaption>
                )}
            </div>
        </motion.figure>
    );

    /* return (
        <figure
            ref={ref}
            className="relative [perspective:600px] flex flex-col items-center justify-center"
            style={{
                width: typeof containerWidth === "number" ? `${containerWidth}px` : containerWidth,
                height: typeof height === "number" ? `${height}px` : height,
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}

            <motion.div
                className="relative [transform-style:preserve-3d] w-full h-full"
                style={{
                    rotateX,
                    rotateY,
                    scale,
                }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute top-0 left-0 object-contain rounded-[15px] will-change-transform [transform:translateZ(0)]"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />

                {displayOverlayContent && overlayContent && (
                    <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
                        {overlayContent}
                    </motion.div>
                )}
            </motion.div>

            {showTooltip && (
                <motion.figcaption
                    className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption,
                    }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    ); */
}
