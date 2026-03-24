import {BiLogoGithub} from "react-icons/bi";
import {useEffect, useRef, useState} from "react";
import {useProject} from "./ProfileProvider.tsx";
import {Icon} from "@iconify/react";
import useGithubStatus from "./githubStatus.ts";
import {IoGitCommit} from "react-icons/io5";
import {MdArrowRight, MdDoubleArrow, MdOutlineReadMore} from "react-icons/md";

interface StatusBarItem {
    label?: string;
    value?: React.ReactNode;
    isDesktopOnly?: boolean;
}

const textItems: StatusBarItem[] = [
    { value: <>⚡ Wissen Technology Intern • Joining Full-Time</> },
    { value: <>📍India • Remote</> },
    { value: <span className="flex items-center gap-1"><Icon icon="logos:react"/>REACT •<Icon icon="logos:vitejs"/> VITE •<Icon icon="logos:typescript-icon"/> TS</span> },
];

const dynamicItems: StatusBarItem[] = [
    { label: "work_title" },
    { label: "github_last_commit" },
]

interface FooterPaneProps {
    isMobile?: boolean
}

const FooterPane = ({isMobile}: FooterPaneProps) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [showMore, setShowMore] = useState(false);

    const [statusBarItems, setStatusBarItems] = useState<StatusBarItem[]>([]);
    const [cursorPosition, setCursorPosition] = useState<number[]>([0, 0]);
    const {project} = useProject();

    const github = useGithubStatus("AJ-316");

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;

        const isOverflowing = el.scrollWidth > el.clientWidth;
        const isAtEnd =
            el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

        setShowMore(isOverflowing && !isAtEnd);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        updateScrollState();

        el.addEventListener("scroll", updateScrollState);
        window.addEventListener("resize", updateScrollState);

        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [statusBarItems]);

    const formatTimeAgo = (date: string) => {
        const diff = Date.now() - new Date(date).getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return `${days}d ago`;
    };

    useEffect(() => {
        setStatusBarItems([...dynamicItems, ...textItems]);
    }, []);

    useEffect(() => {
        setStatusBarItems(prev => prev.map(item => {
            if(item.label === "work_title") {
                return {
                    ...item,
                    value: project === "software-dev" ? <>⚡Systems Engineer</> : <>⚡ Indie Developer</>
                }
            }
            if(item.label === "github_last_commit") {
                return {
                    ...item,
                    value: project === "software-dev" ?
                        <span className="flex items-center gap-1">
                            <IoGitCommit className="w-4 h-4" /> Last Commit: {github ? formatTimeAgo(github.lastCommitDate) : <span className="loading w-4 h-4">.</span>}
                        </span> : undefined
                }
            }
            return item;
        }));
    }, [github, project]);

    useEffect(() => {
        if(isMobile) return;

        const handlePointerMove = (e: PointerEvent) => {
            setCursorPosition([e.clientX, e.clientY]);
        };

        const handlePointerLeaveWindow = () => {
            setCursorPosition([0, 0]);
        };

        window.addEventListener("pointermove", handlePointerMove, {passive: true});
        window.addEventListener("pointerleave", handlePointerLeaveWindow);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerleave", handlePointerLeaveWindow);
        };
    }, [isMobile]);

    useEffect(() => {
        if(isMobile) return;

        setStatusBarItems(prev =>
            prev.map(item =>
                item.label === "Cursor:" ? {
                    ...item, value: <>{cursorPosition[0] + ":" + cursorPosition[1]}</>
                } : item)
        );
    }, [cursorPosition, isMobile]);

    return (
        <div id="footer" className="grid grid-cols-[1fr_auto] items-center md:tracking-widest">
            <div ref={scrollRef}
                 className="flex justify-between whitespace-nowrap overflow-x-auto scrollbar-hide mr-2 md:gap-5">
                {statusBarItems.map((item, i) => (
                    item.value &&
                    <span
                        id={`status-item-${i}`}
                        key={`status-item-${i}`}
                        className={`${item.isDesktopOnly && "hidden md:flex"} flex items-center gap-1 font-code text-xs md:text-md breadcrumb-style btn-i-inactive`}>
                        {/*<span className={`hidden md:block`}>{item.label}</span>*/}
                        {item.value}
                    </span>
                ))}
            </div>
            {showMore && (
                <div
                    className="block md:hidden absolute left-full -translate-x-[150%] animate-[bounceAlt_3s_infinite]">
                    <MdDoubleArrow
                        className="w-10 h-10"
                        style={{ fill: "url(#gradient)" }}
                    />

                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stopColor="#60A5FA50" />
                                <stop offset="50%" stopColor="#3B82F650" />
                                <stop offset="100%" stopColor="#6366F150" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            )}

            {/*<></>*/}
        </div>
    );
}

export default FooterPane;