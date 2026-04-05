import {IconType} from "react-icons";
import {GrJava} from "react-icons/gr";
import {TbBrandJavascript} from "react-icons/tb";
import {FiDatabase} from "react-icons/fi";
import {CiViewTable} from "react-icons/ci";
import {VscJson} from "react-icons/vsc";

export interface NavItem {
    segment: string;
    label: string;
    icon: IconType;
    color: string;
    useProjectBase: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {segment: "home", label: "home.java", icon: GrJava, color: "!text-[#F89820]", useProjectBase: true},
    {segment: "about", label: "about.js", icon: TbBrandJavascript, color: "!text-[#F7DF1E]", useProjectBase: true},
    {segment: "skills", label: "skills.sql", icon: FiDatabase, color: "!text-[#2b7afb]", useProjectBase: false},
    {segment: "projects", label: "projects.csv", icon: CiViewTable, color: "!text-[#6DB33F]", useProjectBase: true},
    {segment: "contact", label: "contact.json", icon: VscJson, color: "!text-[#C77DFF]", useProjectBase: false},
];

export const toPath = (item: NavItem, project?: string | null): string => {
    if (item.useProjectBase) {
        return project ? `/${project}/${item.segment}` : "/";
    }

    return `/${item.segment}`;
};

/**
 * Returns the active NavItem based on the current pathname.
 * It extracts the last segment of the pathname and matches it against the NAV_ITEMS.
 * If no match is found, it returns null.
 *
 * @param pathname - The current URL pathname (e.g., "/my-project/home").
 * @returns The active NavItem or null if no match is found.
 */
export const getActiveNavItem = (pathname: string): NavItem | null => {
    return NAV_ITEMS.find((item) => item.segment === getLastSegment(pathname)) ?? null;
};

export const getLastSegment = (pathname: string): string => {
    const parts = pathname.split("/").filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : "";
};

