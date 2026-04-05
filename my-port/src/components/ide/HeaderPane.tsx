import {NavLink} from "react-router-dom";
import {IconType} from "react-icons";
import {BiLogoGithub, BiLogoGmail, BiLogoLinkedin} from "react-icons/bi";
import {SiLeetcode} from "react-icons/si";
import {useProject} from "./ProfileProvider.tsx";
import {GoProjectSymlink} from "react-icons/go";
import {VscGithubProject} from "react-icons/vsc";

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
    const {project} = useProject();
    return (
        <div className="grid grid-cols-[1fr_auto] w-full items-center rounded-md">
            <NavLink to="/" className="grid grid-cols-[auto_auto_1fr] items-center">
                <span className="logo-aj mx-4"><img src="/logo-aj.png" alt={"AJ"}/></span>
                <div className="hidden md:flex flex-col">
                    <span className="md:text-xl text-lg">Portfolio</span>
                    <span className="md:text-xs text-xs">By Advaitya Jadhav</span>
                </div>
                <span className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-5">
                    <span className="flex items-center gap-2 font-bold uppercase tracking-widest">
                        <VscGithubProject className="w-6 h-6" />
                        Workspace
                    </span>
                    <span className="font-code hidden lg:block">~portfolio/projects/{project}</span>
                    <span className="font-code block lg:hidden text-xs whitespace-nowrap">~portfolio/projects/{project}</span>
                </span>
            </NavLink>

            <div className="grid grid-cols-2 md:flex gap-2 justify-end">
                {socialRedirects.map((social, index) => (
                    <a key={index} className={`${social.disabled ? "btn-i-inactive" : "btn-i-active"}`}
                       href={social.url}>
                        <social.icon className="w-5 h-5 md:w-6 md:h-6"/>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default HeaderPane;