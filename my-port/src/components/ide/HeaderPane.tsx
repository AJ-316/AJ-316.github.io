import {useProject} from "./ProfileProvider.tsx";
import {NavLink, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getActiveNavItem} from "./nav/navConfig.ts";
import {IconType} from "react-icons";
import {BiLogoGithub, BiLogoLinkedin, BiLogoGmail} from "react-icons/bi";
import {SiLeetcode} from "react-icons/si";

interface SocialRedirect {
    icon: IconType,
    url: string;
    disabled?: boolean;
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
        disabled: true
    },
];

const HeaderPane = () => {
    return (
        <div className="grid grid-cols-[1fr_auto] w-full items-center rounded-md">
            <div className="flex items-center">
                <NavLink className="logo-aj mx-4" to={"/"}><img src="/logo-aj.png" alt={"AJ"}/></NavLink>
                <div className="flex flex-col">
                    <span className="md:text-xl text-lg">Portfolio</span>
                    <span className="md:text-xs text-xs">By Advaitya Jadhav</span>
                </div>
            </div>

            {/*<span className="hidden md:block">&#123;Active Workspace: {project}&#125;</span>*/}
            <div className="flex gap-1 justify-end">
                {socialRedirects.map((social, index) => (
                    <a key={index} className={`${social.disabled ? "btn-i-inactive" : "btn-i-active"}`} href={social.url}>
                        <social.icon className="w-5 h-5 md:w-6 md:h-6"/>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default HeaderPane;