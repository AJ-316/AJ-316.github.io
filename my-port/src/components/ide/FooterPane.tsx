import {useEffect, useState} from "react";
import {useProject} from "./ProfileProvider.tsx";
import {Icon} from "@iconify/react";
import useGithubStatus from "./githubStatus.ts";
import {IoGitCommit} from "react-icons/io5";
import {IconType} from "react-icons";
import {useLocation} from "react-router-dom";
import {getActiveNavItem} from "./nav/navConfig.ts";
import {VscGithubProject, VscPackage} from "react-icons/vsc";

interface StatusBarItem {
    label?: string;
    value?: React.ReactNode;
    isDesktopOnly?: boolean;
}

interface BreadCrumb {
    icon?: IconType | null;
    iconColor?: string;
    label: string;
    isActive?: boolean;
}

// note - later might remove some
const textItems: StatusBarItem[] = [
    {value: <>⚡ Wissen Technology Intern • Joining Full-Time</>},
    {value: <>📍India • Remote</>},
    {
        value: <span className="flex items-center gap-1"><Icon icon="logos:react"/>REACT •<Icon icon="logos:vitejs"/> VITE •<Icon
            icon="logos:typescript-icon"/> TS</span>
    },
];
const dynamicItems: StatusBarItem[] = [
    {label: "work_title"},
    {label: "github_last_commit"},
]

interface FooterPaneProps {
    isMobile?: boolean
}

const FooterPane = ({isMobile}: FooterPaneProps) => {
    const [statusBarItems, setStatusBarItems] = useState<StatusBarItem[]>([]);
    const [cursorPosition, setCursorPosition] = useState<number[]>([0, 0]);
    const {project} = useProject();

    const github = useGithubStatus("AJ-316");

    const location = useLocation();
    const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([]);

    useEffect(() => {
        const active = getActiveNavItem(location.pathname);

        setBreadCrumbs([
            {
                icon: VscGithubProject,
                iconColor: "text-[#fff]",
                label: "workspaces",
                isActive: false,
            },
            ...(project ? [{
                icon: VscPackage,
                iconColor: "text-[#fff]",
                label: project,
                isActive: false,
            }] : []),
            ...(active ? [{
                icon: active.icon,
                iconColor: active.color,
                label: active.label,
                isActive: true,
            }] : [])
        ])
    }, [project, location.pathname]);

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
            if (item.label === "work_title") {
                return {
                    ...item,
                    value: project === "software-dev" ? <>⚡Systems Engineer</> : <>⚡ Indie Developer</>
                }
            }
            if (item.label === "github_last_commit") {
                return {
                    ...item,
                    value: project === "software-dev" ?
                        <span className="flex items-center gap-1">
                            <IoGitCommit
                                className="w-4 h-4"/> Last Commit: {github ? formatTimeAgo(github.lastCommitDate) :
                            <span className="loading w-4 h-4">.</span>}
                        </span> : undefined
                }
            }
            return item;
        }));
    }, [github, project]);

    useEffect(() => {
        if (isMobile) return;

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
        if (isMobile) return;

        setStatusBarItems(prev =>
            prev.map(item =>
                item.label === "Cursor:" ? {
                    ...item, value: <>{cursorPosition[0] + ":" + cursorPosition[1]}</>
                } : item)
        );
    }, [cursorPosition, isMobile]);

    return (
        <div id="footer" className="grid grid-cols-[auto_1fr_auto] items-center md:tracking-widest">
            <div
                className="breadcrumbs px-2 flex whitespace-nowrap scrollbar-hide md:overflow-hidden text-[0.6rem] md:text-xs">
                <ul className="gap-0 [&>li]:-mx-[2px] [&>li]:px-0 [&>li]:before:mx-1.5 md:[&>li]:before:mx-4 [&>li]:first:before:mx-0 [&>li+li::before]:text-white [&>li+li::before]:opacity-100">
                    {breadCrumbs.map((crumb, index) => (
                        <li key={`${crumb.label}-${index}`}
                            className={`flex items-center ${index == 0 && "before:mx-0"}`}>
                            <div
                                className={`flex items-center justify-center font-code breadcrumb-style ${crumb.isActive ? "btn-i-active" : "btn-i-inactive"}`}>
                                {/* note - icons everywhere not needed
                                {crumb.icon && <crumb.icon
                                    className={`icon ${crumb.isActive && "-mr-1.5"} md:m-0 ${crumb.iconColor ?? ""}`}/>}*/}
                                <span className={`${crumb.isActive || "block"} md:block`}>{crumb.label}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mx-5 text-gray-400 text-center font-bold">
                <span className="hidden xl:block 2xl:hidden">Test</span>
            </div>
            <div className="min-[1800px]:flex hidden justify-start whitespace-nowrap overflow-x-auto mr-2 gap-2">
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
            {/*{showMore && (
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
            )}*/}

            {/*<></>*/}
        </div>
    );
}

export default FooterPane;