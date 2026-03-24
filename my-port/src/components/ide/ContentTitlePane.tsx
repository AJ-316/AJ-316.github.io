import {useEffect, useState} from "react";
import {IconType} from "react-icons";
import {VscGithubProject, VscPackage} from "react-icons/vsc";
import {NavLink, useLocation} from "react-router-dom";
import {useProject} from "./ProfileProvider.tsx";
import {getActiveNavItem} from "./nav/navConfig.ts";
import {GoProjectSymlink} from "react-icons/go";

interface BreadCrumb {
    icon?: IconType | null;
    iconColor?: string;
    label: string;
    isActive?: boolean;
}

interface CTPProps {
    navOpenButton?: React.ReactNode;
    isNavOpenButtonVisible: boolean;
}

const ContentTitlePane = ({navOpenButton, isNavOpenButtonVisible}: CTPProps) => {
    const location = useLocation();
    const { project } = useProject();
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

    return (
        <div className="grid-cols-[auto_auto_1fr_auto] title-pane">
            <div className={`transition-[padding,margin,width,opacity] border-gray-600 duration-800 ${isNavOpenButtonVisible ? "border-r-1 opacity-100 mr-4 pr-4":"border-r-0 m-0 p-0 w-0 opacity-0"}`}>
                {navOpenButton}
            </div>
            <div className="breadcrumbs flex whitespace-nowrap scrollbar-hide md:overflow-hidden text-[0.6rem] md:text-xs">
                <ul className="gap-0 [&>li]:-mx-[2px] [&>li]:px-0 [&>li]:before:mx-1.5 md:[&>li]:before:mx-4 [&>li]:first:before:mx-0 [&>li+li::before]:text-white [&>li+li::before]:opacity-100">
                    {breadCrumbs.map((crumb, index) => (
                        <li key={`${crumb.label}-${index}`} className={`flex items-center ${index == 0 && "before:mx-0"}`}>
                            <div className={`flex items-center justify-center font-code breadcrumb-style ${crumb.isActive ? "btn-i-active" : "btn-i-inactive"}`}>
                                {crumb.icon && <crumb.icon className={`icon ${crumb.isActive && "-mr-1.5"} md:m-0 ${crumb.iconColor ?? ""}`} />}
                                <span className={`${crumb.isActive || "hidden"} md:block`}>{crumb.label}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <span></span>
            <div className="flex items-center text-sm">
                <NavLink className="flex items-center btn-i-active" to={"/"}>
                    <span className="hidden md:block mr-2">Change Workspace</span>
                    <GoProjectSymlink className="icon" />
                </NavLink>
            </div>
        </div>
    );
};

export default ContentTitlePane;