import {NavLink} from "react-router-dom";
import {IconType} from "react-icons";

interface NavButtonProps {
    to: string;
    label: string;
    color?: string;
    icon?: IconType;
    onClick?: () => void;
    className?: string;
}

const NavButton = ({to, label, color, icon: Icon, onClick, className}: NavButtonProps) => {
    return (
        <NavLink
            to={to}
            relative="path"
            onClick={onClick}
            className={({isActive}) =>
                `font-code nav-btn ${isActive ? "nav-btn-active" : "nav-btn-inactive" } ${className ?? ""}`
            }
        >
            {Icon && <Icon className={`w-5 h-5 text-xl ${color}`}/>}
            {label}
        </NavLink>
    )
}

export default NavButton;