import { IconType } from "react-icons";
import { GrJava } from "react-icons/gr";
import { TbBrandJavascript } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { CiViewTable } from "react-icons/ci";
import { VscJson } from "react-icons/vsc";

export interface NavItem {
    segment: string;
    label: string;
    icon: IconType;
    color: string;
    useProfileBase: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    { segment: "home", label: "home.java", icon: GrJava, color: "!text-[#F89820]", useProfileBase: true },
    { segment: "about", label: "about.js", icon: TbBrandJavascript, color: "!text-[#F7DF1E]", useProfileBase: true },
    { segment: "skills", label: "skills.sql", icon: FiDatabase, color: "!text-[#2b7afb]", useProfileBase: false },
    { segment: "projects", label: "projects.csv", icon: CiViewTable, color: "!text-[#6DB33F]", useProfileBase: true },
    { segment: "contact", label: "contact.json", icon: VscJson, color: "!text-[#C77DFF]", useProfileBase: false },
];

export const toPath = (item: NavItem, profile?: string | null): string => {
    if (item.useProfileBase) {
        return profile ? `/${profile}/${item.segment}` : "/";
    }

    return `/${item.segment}`;
};

export const getActiveNavItem = (pathname: string): NavItem | null => {
    const parts = pathname.split("/").filter(Boolean);
    const segment = parts.length > 0 ? parts[parts.length - 1] : "";
    return NAV_ITEMS.find((item) => item.segment === segment) ?? null;
};

