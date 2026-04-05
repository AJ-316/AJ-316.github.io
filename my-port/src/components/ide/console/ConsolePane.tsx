import {Outlet} from "react-router-dom";
import {ExecState} from "../IDEMain.tsx";
import OutputExecutingPg from "./OutputExecutingPg.tsx";
import {LoadingIcon, StopIcon} from "../../OutputIcons.tsx";
import {RiCodeSSlashFill, RiTerminalBoxFill, RiTerminalBoxLine} from "react-icons/ri";
import React from "react";
import {IoTerminal, IoTerminalOutline} from "react-icons/io5";

interface ConsolePaneProps {
    executeState?: ExecState
}

const ConsolePane = ({executeState}: ConsolePaneProps) => {
    return (
        /* Background Blur */
        <div className={`absolute w-full panel-backdrop rounded-lg transition-all duration-400 z-9 overflow-hidden
            ${executeState == "running" || executeState == "executing" || executeState == "terminating"
            ? "h-[calc(100%-1.5rem)] bottom-0 p-1 pt-6 md:p-2 md:pt-6 2xl:p-6 2xl:pt-12"
            : "h-0 bottom-0"}`}
        > {/*note - z-10 looking better for blurring bottom edge of content title pane but not consistent; few pixels error-margin.
              z-5 consistent; edge not blurred; console appears inside rather on top of editor*/}

            {/* Console Panel Wrapper */}
            <div className="panel-console h-full min-h-0 flex flex-col">
                {/* Console Header Pane */}
                <div className="grid-cols-[auto_1fr_auto] items-center title-pane-console">
                    <div
                        className="flex items-center gap-3 transition-all text-gray-400 uppercase text-xs tracking-widest border-solid border-r border-slate-700/40 pr-2 mr-2 pl-0 ml-0">
                        <RiTerminalBoxLine className="text-lg"/>
                        Console
                    </div>
                    <span/>
                    {executeState != "stopped" &&
                        <LoadingIcon
                            label={executeState}
                            colorGA={executeState == "running" ? "#4ade80" : undefined}
                            colorGB={executeState == "running" ? "#22c55e" : undefined}
                            iconOnlyOnMobile={true}
                        />
                    }
                </div>

                {/* Console Content */}
                <div className="w-full p-4 overflow-y-auto overflow-x-hidden">
                    {executeState == "running" ? <Outlet context={{isOutput: true}}/> :
                        executeState == "executing" ?
                            <OutputExecutingPg/>
                            : executeState == "terminating" ?
                                <>Terminating</>
                                : <>Output Cleared</>
                    }
                </div>
            </div>
        </div>
    )
}

export default ConsolePane;