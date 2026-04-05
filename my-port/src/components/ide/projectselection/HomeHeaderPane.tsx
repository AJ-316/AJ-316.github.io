import {RefObject} from "react";
import {NavLink} from "react-router-dom";

interface HomeHeaderPaneProps {
    onNavToggle: () => void;
    isNavOpen: boolean;
    buttonRef: RefObject<HTMLSpanElement | null>;
    infoText?: string;
}

const HomeHeaderPane = ({onNavToggle, isNavOpen, buttonRef, infoText}: HomeHeaderPaneProps) => {

    return (
        <div className="grid grid-cols-[auto_1fr_auto] items-center grid-rows-1 w-full">
            <NavLink className="logo-aj mx-4" to={"/"}><img src="/logo-aj.png" alt={"AJ"}/></NavLink>
            <div className="flex flex-col">
                <span className="text-2xl">Portfolio</span>
                <span className="text-sm">By Advaitya Jadhav</span>
            </div>

            <span ref={buttonRef} className="block md:hidden" onClick={onNavToggle}>
                {/*<IoMenu className="text-4xl"/>*/}
                <svg viewBox="0 0 10 10" className="w-10 h-10" stroke="#fff" strokeWidth=".6" fill="none"
                     strokeLinecap="round">
                    <path d={isNavOpen ? "M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7" : "M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"}
                          className="duration-200"/>
                </svg>
            </span>

            <span className="text-sm text-center .border-t col-span-3 md:col-auto border-slate-700/40 text-slate-400 mt-5 pt-2 -mb-5
                            md:border-0 md:text-xl md:-m-0 md:p-0">
                {infoText}
            </span>
        </div>
    )
}

export default HomeHeaderPane;