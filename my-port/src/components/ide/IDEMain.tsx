import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {Navigate, Outlet, useLocation, useParams} from "react-router-dom";
import HeaderPane from "./HeaderPane.tsx";
import NavigationPane from "./NavigationPane.tsx";
import FooterPane from "./FooterPane.tsx";
import ContentTitlePane from "./ContentTitlePane.tsx";
import NavDisplayButton from "./NavDisplayButton.tsx";
import {useProfile} from "./ProfileProvider.tsx";
import {profiles} from "./profiles.ts";
import {getActiveNavItem} from "./nav/navConfig.ts";
import {useLineCount} from "./lineCount.ts";

const IDEMain = () => {
    const location = useLocation();
    const {profile: urlProfile} = useParams();
    const {profile, setProfile} = useProfile();

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const lineHeight = 24;
    const {ref, lineCount} = useLineCount(lineHeight);
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const validProfileSlugs = useMemo(
        () => new Set(profiles.map((item) => item.link.replace(/^\//, ""))),
        []
    );

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)");
        const applyMediaState = (matches: boolean) => {
            setIsMobile(matches);
            setIsNavOpen(!matches);
        }

        applyMediaState(media.matches);

        const onChange = (event: MediaQueryListEvent) => {
            applyMediaState(event.matches);
        };

        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        if (urlProfile) {
            setProfile(urlProfile);
        }
    }, [urlProfile, setProfile]);

    const activeItem = getActiveNavItem(location.pathname);
    const effectiveProfile = urlProfile ?? profile;

    if (urlProfile && !validProfileSlugs.has(urlProfile)) {
        return <Navigate to="/" replace/>;
    }

    if (activeItem?.useProfileBase && !effectiveProfile) {
        return <Navigate to="/" replace/>;
    }

    const handleUpdateLine = (e: React.MouseEvent | React.TouchEvent) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();

        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        const visibleLine = Math.floor((clientY - rect.top) / lineHeight)
        const scrollOffset = Math.floor(el.scrollTop / lineHeight);

        const line = visibleLine + scrollOffset;

        /*note - auto-scroll too harsh
        const maxVisible = Math.floor(rect.height / lineHeight);

        if (visibleLine >= maxVisible) el.scrollTop += lineHeight;
        if (visibleLine <= 0) el.scrollTop -= lineHeight;*/

        setHoveredLine(Math.max(0, line));
    }

    return (
        <div className={`grid h-dvh grid-rows-[auto_1fr_auto] bg-neutral-950
                        pb-[calc(env(safe-area-inset-bottom)+12px)] select-none
                         ${isMobile ? "grid-cols-[1fr]" : "grid-cols-[auto_1fr]"}`}>
            <header className="col-span-2 p-3">
                <HeaderPane/>
            </header>

            <nav className={`min-h-0 transition-[translate,opacity,width] duration-800
                            ${isNavOpen ? "w-[260px]" : "mx-0 w-0"}
                            ${isMobile ? "absolute translate-y-26 z-50" : "relative"}`}
                 style={{opacity: isNavOpen ? 1 : 0}}>
                <NavigationPane
                    onClose={() => {
                        if (isMobile)
                            setIsNavOpen(false);
                    }}
                    closeButton={<NavDisplayButton setIsNavOpen={setIsNavOpen} isNavOpen={false}/>}/>
            </nav>

            <main className={`grid grid-rows-[auto_1fr] min-h-0 panel`}>
                <ContentTitlePane isNavOpenButtonVisible={!isNavOpen || isMobile} navOpenButton={<NavDisplayButton setIsNavOpen={setIsNavOpen} isNavOpen={true}/>}/>

                <div ref={contentRef}
                     className="flex min-h-0 p-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
                     onMouseMove={handleUpdateLine}
                     onTouchMove={handleUpdateLine}
                     onMouseLeave={() => setHoveredLine(null)}
                >
                    <div className="min-w-0">
                        <div className="text-right text-gray-600 font-code text-xs leading-6 pr-1 border-r-1">
                            {Array.from({length: lineCount}).map((_, i) => (
                                <div key={i} className="/*snap-start*/">{i + 1}</div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 ml-1 relative">
                        {hoveredLine !== null && (
                            <div
                                className="absolute -left-50 right-0 h-6 bg-white/10 pointer-events-none transition-all duration-75"
                                style={{
                                    transform: `translateY(${hoveredLine * lineHeight}px)`,
                                }}
                            />
                        )}

                        <div className="overflow-x-auto overflow-y-hidden">
                            <div ref={ref} className="font-code h-full leading-6 select-text">
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="z-10 col-span-2 my-3 mx-2 md:mx-1.5 md:mb-0 md:mt-5">
                <FooterPane/>
            </footer>
        </div>
    );
};

export default IDEMain;

