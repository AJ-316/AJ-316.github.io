import {useEffect, useState} from "react";
import {IconType} from "react-icons";
import {VscGithubProject, VscPackage} from "react-icons/vsc";
import {useLocation} from "react-router-dom";
import {useProfile} from "./ProfileProvider.tsx";
import {getActiveNavItem} from "./nav/navConfig.ts";

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
    const { profile } = useProfile();
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
            ...(profile ? [{
                icon: VscPackage,
                iconColor: "text-[#fff]",
                label: profile,
                isActive: false,
            }] : []),
            ...(active ? [{
                icon: active.icon,
                iconColor: active.color,
                label: active.label,
                isActive: true,
            }] : [])
        ])
    }, [profile, location.pathname]);

    return (
        <div className="grid grid-cols-[auto_auto_1fr_auto] grid-rows-[18px] items-center m-1 p-3 border-b border-gray-500 rounded-lg">
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
        </div>
    );
};

export default ContentTitlePane;