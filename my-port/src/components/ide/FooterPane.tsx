import {IconType} from "react-icons";
import {BiLogoGithub, BiLogoGmail, BiLogoLinkedin, BiLogoReact} from "react-icons/bi";
import {SiLeetcode, SiVite} from "react-icons/si";
import {useEffect, useState} from "react";
import {useProfile} from "./ProfileProvider.tsx";
import {useLocation} from "react-router-dom";
import {getActiveNavItem} from "./nav/navConfig.ts";
import {VscGithubProject, VscPackage} from "react-icons/vsc";
import {Icon} from "@iconify/react";

interface SocialRedirect {
    icon: IconType,
    url: string;
}

interface StatusBarItem {
    label: string;
    value: React.ReactNode;
    color: string;
}

const socialRedirects: SocialRedirect[] = [
    {
        icon: BiLogoGithub,
        url: "https://github.com/AJ-316",
    },
    {
        icon: BiLogoLinkedin,
        url: "https://www.linkedin.com/in/advaitya-jadhav-7127673a2/",
    },
    {
        icon: BiLogoGmail,
        url: "mailto:advaityajadhav@gmail.com?subject=Hello&body=Hi%20Advaitya%2C",
    },
    {
        icon: SiLeetcode,
        url: "https://leetcode.com/AdvaityaJadhav",
    },
];

const FooterPane = () => {
    const location = useLocation();
    const {profile} = useProfile();

    const [statusBarItems, setStatusBarItems] = useState<StatusBarItem[]>([]);

    useEffect(() => {
        const active = getActiveNavItem(location.pathname);

        setStatusBarItems([
            ...(active ? [{
                label: "View:",
                value:
                    <span className="flex items-center gap-2">
                        <active.icon className={`icon ${active?.color}`}/>/{active?.label}
                    </span>,
                color: "border-green-400",
            }] : []),
            {
                label: "Status:",
                value: <>🟢READY</>,
                color: "border-green-400",
            },
            {
                label: "TechStack:",
                value:
                    <span className="flex items-center gap-1">
                        <Icon icon="logos:react" />REACT •
                        <Icon icon="logos:vitejs" /> VITE •
                        <Icon icon="logos:typescript-icon" />TYPESCRIPT
                    </span>,
                color: "border-green-400",
            },
        ])
    }, [profile, location.pathname]);

    return (
        <div className="grid grid-cols-[1fr_auto] items-center tracking-widest">
            <div className="flex whitespace-nowrap overflow-x-auto scrollbar-hide mr-2">
                {statusBarItems.map((item, i) => (
                    <span
                        className={`flex items-center gap-1 font-code text-xs md:text-md breadcrumb-style btn-i-inactive ${item.color}`}>
                        <span className={`hidden md:block`}>{item.label}</span>
                        {item.value}
                    </span>
                ))}
            </div>
            <div className="flex gap-1 md:gap-3 justify-end">
                {socialRedirects.map((social, index) => (
                    <a key={index} className="btn-i-active" href={social.url}>
                        <social.icon className="text-2xl"/>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default FooterPane;