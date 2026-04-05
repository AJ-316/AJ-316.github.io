import {Outlet, useLocation} from "react-router-dom";
import HomeHeaderPane from "./HomeHeaderPane.tsx";
import HomeNavPane from "./HomeNavPane.tsx";
import {useEffect, useRef, useState} from "react";
import {getLastSegment} from "../nav/navConfig.ts";

interface IDEHomeProps {
    isMobile?: boolean
}

interface InfoText {
    text: string;
    url: string;
}

const infoTexts: Map<string, string> = new Map([
    ["home-about", "Go to Projects to select a view"],
    ["home-contact", "Go to Projects to select a view"], // note - temp
    ["", "Select a view to explore"],
]);

const IDEHome = ({isMobile}: IDEHomeProps) => {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLSpanElement | null>(null);

    const location = useLocation();

    useEffect(() => {
        setIsNavOpen(!isMobile);
    }, [isMobile]);

    useEffect(() => {
        const handleOutside = (e: TouchEvent | MouseEvent) => {
            if (!isMobile) return;

            const target = e.target as Node;

            if (!navRef.current || !buttonRef.current) return;

            const clickedInsideNav = navRef.current.contains(target);
            const clickedButton = buttonRef.current.contains(target);

            if (!clickedInsideNav && !clickedButton) {
                setIsNavOpen(false);
            }
        };

        document.addEventListener("touchstart", handleOutside);
        document.addEventListener("mousedown", handleOutside);

        return () => {
            document.removeEventListener("touchstart", handleOutside);
            document.removeEventListener("mousedown", handleOutside);
        };
    }, [isMobile]);

    return (
        <div className="absolute
                        grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]
                        w-full h-full p-4
                        md:min-w-[50%] md:min-h-[50%] md:w-auto md:h-auto md:p-2
                        md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                        home-surface" /*md:border-y-1 border-gray-400/50 md:rounded-2xl md:shadow-black md:shadow-2xl*/
        >
            <div className="col-span-2 m-2 p-4 home-section" /*md:bg-neutral/50 rounded-xl*/>
                <HomeHeaderPane infoText={infoTexts.get(getLastSegment(location.pathname))} isNavOpen={isNavOpen}
                                onNavToggle={() => setIsNavOpen(p => !p)} buttonRef={buttonRef}/>
            </div>

            <div ref={navRef}
                 className={`${isNavOpen || "hidden"} absolute left-full -translate-x-[110%] translate-y-25
                            md:block md:relative md:left-0 md:translate-x-0 md:translate-y-0
                            ml-2 mb-2 mr-1 p-4 home-section 
                            bg-slate-950 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08),0_8px_22px_rgba(0,0,0,0.38)] rounded-xl
                            md:shadow-none md:bg-transparent` /*bg-gray-950 rounded-xl*/}>
                <HomeNavPane onClose={() => {
                    if (isMobile) setIsNavOpen(false);
                }}/>
            </div>

            <div className="col-span-2
                            md:col-span-1 md:min-w-[380px]
                            mr-2 mb-2 ml-1 p-4
                            home-section home-divider" /*border-y-1 border-gray-400/50 bg-neutral/50 rounded-xl
                            md:border-0*/>
                <Outlet/>
            </div>
        </div>
    );
};

export default IDEHome;

