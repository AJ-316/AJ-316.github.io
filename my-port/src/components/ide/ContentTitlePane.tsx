import {NavLink, useLocation} from "react-router-dom";
import {GoProjectSymlink} from "react-icons/go";
import {getActiveNavItem, getLastSegment, NavItem} from "./nav/navConfig.ts";
import React, {useEffect, useState} from "react";
import {ExecState} from "./IDEMain.tsx";
import {CiFolderOn} from "react-icons/ci";
import {RiCodeSSlashFill} from "react-icons/ri";
import {LoadingIcon, PlayIcon, StopIcon} from "../OutputIcons.tsx";

interface CTPProps {
    navOpenButton?: React.ReactNode,
    isNavOpenButtonVisible: boolean,
    onExecuteStop: () => void,
    onExecuteRun: () => void,
    executeState?: ExecState,
}

const ContentTitlePane = ({
                              navOpenButton,
                              isNavOpenButtonVisible,
                              onExecuteRun,
                              onExecuteStop,
                              executeState
                          }: CTPProps) => {
    const location = useLocation();
    const [openedFile, setOpenedFile] = useState<NavItem | null>(null);

    useEffect(() => {
        setOpenedFile(getActiveNavItem(location.pathname));
    }, [location.pathname]);

    return (
        <div className={`grid-cols-[auto_auto_1fr_auto_auto] md:grid-cols-[auto_auto_1fr_1fr_auto] items-center title-pane z-10`}>
            <div className={`transition-[padding,margin,width,opacity] border-gray-600 duration-800 
                ${isNavOpenButtonVisible ? "opacity-100" : "opacity-0 w-0 pointer-events-none"}`}>
                {navOpenButton}
            </div>

            <div className={`hidden md:flex items-center gap-3 transition-all text-gray-400 uppercase text-xs tracking-widest border-solid border-r border-slate-700/40
                            ${isNavOpenButtonVisible ? "px-4 mx-4 border-l" : "pr-2 mr-2 pl-0 ml-0"}`}>
                <RiCodeSSlashFill className="text-lg"/>
                Editor
            </div>

            <div className="flex md:hidden h-4 pl-4 ml-4 border-l-1 border-slate-700/40"></div>

            <div className="flex items-center gap-2">
                {executeState == "stopped" ?
                    <div className="flex btn-i-active" onClick={onExecuteRun}>
                        <PlayIcon label={"Execute"} />
                    </div>
                    : executeState == "running" ?
                        <div className="btn-i-active" onClick={onExecuteStop}>
                            <StopIcon label={executeState} />
                        </div>
                        :
                        <div className="btn-i-inactive">
                            <LoadingIcon label={executeState} />
                        </div>
                }
            </div>

            <div className="font-code w-fit mr-2 text-gray-400 px-0 py-1 shadow-[inset_0_0_10px_black] rounded-lg max-md:opacity-50">
                {openedFile &&
                    <div className="flex items-center px-2 text-xs md:text-[13px]">
                        {openedFile.label}
                        <openedFile.icon className={`ml-2 ${openedFile.color}`}/>
                    </div>
                }
            </div>

            <div className="flex items-center">
                <NavLink className="flex items-center text-error btn-i-active" to={"/"}>
                    <span className="hidden md:block mr-2 text-xs uppercase tracking-widest font-bold">Switch</span>
                    <GoProjectSymlink className="icon"/>
                </NavLink>
            </div>
        </div>
    );
};

export default ContentTitlePane;