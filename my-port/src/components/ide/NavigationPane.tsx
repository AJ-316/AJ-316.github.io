import NavButton from "./nav/NavButton.tsx";
import PaneTitleBar from "./PaneTitleBar.tsx";
import {GrJava} from "react-icons/gr";
import {TbBrandJavascript} from "react-icons/tb";
import {CiViewTable} from "react-icons/ci";
import {VscJson} from "react-icons/vsc";
import {CiFolderOn} from "react-icons/ci";
import {useProfile} from "./ProfileProvider.tsx";
import {FiDatabase} from "react-icons/fi";
import {useEffect, useState} from "react";
import {GoSidebarExpand} from "react-icons/go";

const NavigationPane = () => {
    const [isOpen, setIsOpen] = useState(true);

    const {profile} = useProfile();
    const base = profile ? `/${profile}` : "";

    useEffect(() => {
        const media = window.matchMedia("(max-width:768px)");

        const onChange = (e: MediaQueryListEvent) => {
            setIsOpen(!e.matches);
        };

        setIsOpen(!media.matches);

        media.addEventListener("change", onChange);

        return () => media.removeEventListener("change", onChange);
    }, []);

    return (
        <div className={`bg-gray-900/50 border-gray-500 border-1 rounded-xl
        ${isOpen ? "w-64 h-full" : "w-12 h-12 flex justify-center items-center"} transition-all duration-300 overflow-hidden`}>
            {isOpen &&
                <>
                    {/*<PaneTitleBar title="File Explorer" icon={CiFolderOn} onClose={() => setIsOpen(false)}/>*/}
                    <div className="grid grid-cols-[auto_1fr_auto] uppercase items-center text-xs tracking-widest text-neutral-400 gap-3 m-1 p-3 border-b border-gray-500 rounded-lg">
                        <CiFolderOn className="text-lg" /> File Explorer
                        <button className="btn btn-soft btn-error h-auto px-1 m-0" onClick={() => setIsOpen(false)}>X</button>
                    </div>

                    <div className="p-2 pl-4">
                        <NavButton to={`${base}/home`} label={"home.java"} icon={GrJava} color="text-[#F89820]"/>
                        <NavButton to={`${base}/about`} label={"about.js"} icon={TbBrandJavascript}
                                   color="text-[#F7DF1E]"/>
                        <NavButton to={"/skills"} label={"skills.sql"} icon={FiDatabase} color="text-[#2b7afb]"/>
                        <NavButton to={`${base}/projects`} label={"projects.csv"} icon={CiViewTable}
                                   color="text-[#6DB33F]"/>
                        <NavButton to={"/contact"} label={"contact.json"} icon={VscJson} color="text-[#C77DFF]"/>
                    </div>
                </>
            }

            {isOpen ||
                <button className="btn btn-soft btn-info h-auto px-1 m-0" onClick={() => {
                }}>
                    <GoSidebarExpand className="text-xl" onClick={() => setIsOpen(true)}/>
                </button>
            }
        </div>
    );
}

export default NavigationPane;