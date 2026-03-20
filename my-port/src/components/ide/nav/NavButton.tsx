import {NavLink} from "react-router-dom";
import {IconType} from "react-icons";

interface NavButtonProps {
    to: string;
    label: string;
    color: string;
    icon: IconType;
}

const NavButton = ({to, label, color, icon: Icon}: NavButtonProps) => {
    return (
        <NavLink
            to={to}
            relative="path"
            className={({isActive}) =>
                `flex items-center gap-2 btn btn-outline border-transparent justify-start w-full h-auto font-code text-neutral-300 text-lg my-1 
                ${isActive ? "bg-gray-600/30" : "hover:bg-blue-400/40"}`
            }
        >
            {Icon && <Icon className={`w-5 h-5 text-xl ${color}`} />}
            {label}
        </NavLink>
    )
}

export default NavButton;