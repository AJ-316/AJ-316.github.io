import {NavLink} from "react-router-dom";
import {IconType} from "react-icons";

interface NavButtonProps {
    to: string;
    label: string;
    color: string;
    icon: IconType;
    onClick?: () => void;
}

const NavButton = ({to, label, color, icon: Icon, onClick}: NavButtonProps) => {
    return (
        <NavLink
            to={to}
            relative="path"
            onClick={onClick}
            className={({isActive}) =>
                `flex items-center gap-2 btn btn-outline border-1 border-blue-400/10 justify-start w-full h-auto font-code text-neutral-300 text-lg my-1 rounded-lg
                ${isActive ? "bg-blue-400/15" : " bg-gray-900/50 hover:bg-white/15 hover:border-white/15"}`
            }
        >
            {Icon && <Icon className={`w-5 h-5 text-xl ${color}`} />}
            {label}
        </NavLink>
    )
}

export default NavButton;