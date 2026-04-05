import {useEffect, useMemo, useRef, useState} from "react";
import {Navigate, Outlet, useLocation, useParams} from "react-router-dom";
import HeaderPane from "./HeaderPane.tsx";
import NavigationPane from "./NavigationPane.tsx";
import FooterPane from "./FooterPane.tsx";
import ContentTitlePane from "./ContentTitlePane.tsx";
import NavDisplayButton from "./NavDisplayButton.tsx";
import {useProject} from "./ProfileProvider.tsx";
import {projects} from "./projects.ts";
import {getActiveNavItem} from "./nav/navConfig.ts";
import {useLineCount} from "./lineCount.ts";
import ConsolePane from "./console/ConsolePane.tsx";

export type ExecState = "stopped" | "executing" | "terminating" | "running";

interface IDEMainProps {
    isMobile: boolean;
}

const IDEMain = ({isMobile}: IDEMainProps) => {
    const location = useLocation();
    const {project: urlProject} = useParams();
    const {project, setProject} = useProject();

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [executeState, setExecuteState] = useState<ExecState>("stopped");
    const timeoutRef = useRef<number | null>(null);

    const lineHeight = 24;
    const {ref, lineCount} = useLineCount(lineHeight);
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleRun = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (executeState !== "stopped") return;

        setExecuteState("executing");

        timeoutRef.current = window.setTimeout(() => {
            setExecuteState("running");
        }, 800);
    };

    const handleStop = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setExecuteState("terminating");

        timeoutRef.current = window.setTimeout(() => {
            setExecuteState("stopped");
        }, 800);
    };


    useEffect(() => {
        setIsNavOpen(!isMobile);
    }, [isMobile]);

    const validProfileSlugs = useMemo(
        () => new Set(projects.map((item) => item.link.replace(/^\//, ""))),
        []
    );

    useEffect(() => {
        if (urlProject) {
            setProject(urlProject);
        }
    }, [urlProject, setProject]);

    const activeItem = getActiveNavItem(location.pathname);
    const effectiveProfile = urlProject ?? project;

    if (urlProject && !validProfileSlugs.has(urlProject)) {
        return <Navigate to="/" replace/>;
    }

    if (activeItem?.useProjectBase && !effectiveProfile) {
        return <Navigate to="/" replace/>;
    }

    const handleUpdateLine = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();

        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        const y = clientY - rect.top + el.scrollTop;
        const line = Math.floor(y / lineHeight);

        /*note - auto-scroll too harsh
        const maxVisible = Math.floor(rect.height / lineHeight);

        if (visibleLine >= maxVisible) el.scrollTop += lineHeight;
        if (visibleLine <= 0) el.scrollTop -= lineHeight;*/

        setHoveredLine(Math.max(0, line));
    }

    return (
        <div className={`grid h-dvh grid-rows-[auto_1fr_auto] bg-gradient-to-br from-slate-950 to-black
                        pb-[calc(env(safe-area-inset-bottom)+12px)]
                         ${isMobile ? "grid-cols-[1fr]" : "grid-cols-[auto_1fr]"}`}>

            {/*TITLE BAR*/}
            <header className="col-span-2 p-3">
                <HeaderPane/>
            </header>

            {/*EXPLORER*/}
            <nav className={`min-h-0 transition-[translate,opacity,width] duration-800
                            ${isNavOpen ? "w-[260px]" : "mx-0 w-0"}
                            ${isMobile ? "absolute translate-y-17 z-50" : "relative"}`}
                 style={{opacity: isNavOpen ? 1 : 0}}>
                <NavigationPane
                    onClose={() => {
                        if (isMobile)
                            setIsNavOpen(false);
                    }}
                    closeButton={<NavDisplayButton setIsNavOpen={setIsNavOpen} isNavOpen={false}/>}/>
            </nav>

            {/*MAIN*/}
            <main className="flex min-h-0">

                <div className="grid grid-rows-[auto_1fr] h-full panel relative flex-1 min-h-0">
                    <ContentTitlePane
                        executeState={executeState}
                        isNavOpenButtonVisible={!isNavOpen || isMobile}
                        navOpenButton={<NavDisplayButton setIsNavOpen={setIsNavOpen} isNavOpen={true}/>}
                        onExecuteRun={handleRun}
                        onExecuteStop={handleStop}
                    />

                    {/*Editor wrapper*/}
                    <div ref={contentRef}
                         className="flex min-h-0 overflow-auto" // flex min-h-0 p-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory
                         onMouseMove={handleUpdateLine}
                         onTouchMove={handleUpdateLine}
                         onMouseLeave={() => setHoveredLine(null)}
                    >
                        {/*Line Gutter*/}
                        <div className="flex-shrink-0 sticky left-0 min-w-0 pr-1 border-r-1 text-gray-600 p-1 bg-slate-950 z-5"
                             style={{ height: contentRef.current?.scrollHeight ?? 0 }}
                        >
                            <div
                                className="text-right font-code text-xs leading-6">
                                {Array.from({length: lineCount}).map((_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                        </div>

                        {/*Page Editor*/}
                        <div className="relative flex-1 min-w-0 p-1">
                            {hoveredLine !== null && (
                                <div
                                    className="absolute -left-6 h-6 bg-white/10 pointer-events-none transition-all duration-75 z-5"
                                    style={{
                                        width: contentRef.current?.scrollWidth ?? 0,
                                        transform: `translateY(${hoveredLine * lineHeight}px)`,
                                    }}
                                />
                            )}

                            <div ref={ref} className="font-code select-text">
                                <Outlet context={{isOutput: false}}/>
                            </div>
                        </div>
                    </div>

                    <ConsolePane executeState={executeState}/>
                </div>


            </main>

            <footer className="z-10 col-span-2 my-3 mx-2 md:mx-1.5 md:mb-0 md:mt-5">
                <FooterPane isMobile={isMobile}/>
            </footer>
        </div>
    );
};

export default IDEMain;

