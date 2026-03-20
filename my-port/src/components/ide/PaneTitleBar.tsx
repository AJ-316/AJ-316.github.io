import {IconType} from "react-icons";

interface PaneTitleBarProps {
    icon?: IconType;
    title?: string;
    onClose: () => void;
}

const PaneTitleBar = ({icon: Icon, title, onClose}: PaneTitleBarProps) => {
    return (
        <div className="grid grid-cols-[auto_1fr_auto] uppercase items-center text-xs tracking-widest text-neutral-400 gap-3 m-1 p-3 border-b border-gray-500 rounded-lg">
            {Icon && <Icon className="text-lg" />}
            {title}
            <button className="btn btn-soft btn-error h-auto px-1 m-0" onClick={onClose}>X</button>
        </div>
    )
}

export default PaneTitleBar;