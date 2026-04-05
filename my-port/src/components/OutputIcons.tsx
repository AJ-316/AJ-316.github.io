import React from "react";

interface IconProps {
    label?: string;
    colorGA?: string;
    colorGB?: string;
    iconOnlyOnMobile?: boolean;
}

const IconTitle = ({label, colorGA = "#6366f1", colorGB = "#38bdf8", iconOnlyOnMobile = false}: IconProps) => {
    return (
        label &&
        <span
            className={`${iconOnlyOnMobile && "hidden md:block"} text-xs uppercase tracking-widest bg-clip-text text-transparent mr-1 font-bold`}
            style={{
                backgroundImage: `linear-gradient(to right, ${colorGA}, ${colorGB})`,
            }}>
                {label}
            </span>
    )
}

export const LoadingIcon = ({label, colorGA = "#6366f1", colorGB = "#38bdf8", iconOnlyOnMobile = false}: IconProps) => {
    return (
        <div className="flex items-center">
            <IconTitle label={label} colorGA={colorGA} colorGB={colorGB} iconOnlyOnMobile={iconOnlyOnMobile} />
            <svg xmlns="http://www.w3.org/2000/svg" className="icon animate-spin" viewBox="0 0 24 24">
                <defs>
                    <linearGradient id="spinGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={colorGA}/>
                        <stop offset="100%" stopColor={colorGB}/>
                    </linearGradient>
                </defs>

                <circle cx="12" cy="12" r="9"
                        stroke="url(#spinGrad)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="40 60"
                        fill="none"/>
            </svg>
        </div>
    )
}

export const PlayIcon = ({label = "Execute", colorGA = "#4ade80", colorGB = "#22c55e", iconOnlyOnMobile = false}: IconProps) => {
    return (
        <div className="flex items-center">
            <IconTitle label={label} colorGA={colorGA} colorGB={colorGB} iconOnlyOnMobile={iconOnlyOnMobile} />
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="3 3 18 18">
                <defs>
                    <linearGradient id="runGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={colorGA}/>
                        <stop offset="100%" stopColor={colorGB}/>
                    </linearGradient>
                </defs>

                <path d="M8 5L19 12L8 19V5Z"
                      fill="url(#runGrad)"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="0.8"/>
            </svg>
        </div>
    )
}

export const StopIcon = ({label = "Running", colorGA = "#f87171", colorGB = "#ef4444", iconOnlyOnMobile = false}: IconProps) => {
    return (
        <div className="flex items-center">
            <IconTitle label={label} colorGA={colorGA} colorGB={colorGB} iconOnlyOnMobile={iconOnlyOnMobile} />
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="3 3 18 18">
                <defs>
                    <linearGradient id="stopGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={colorGA}/>
                        <stop offset="100%" stopColor={colorGB}/>
                    </linearGradient>
                </defs>

                <rect x="7" y="7" width="10" height="10" rx="2"
                      fill="url(#stopGrad)"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="0.8"/>
            </svg>
        </div>
    )
}