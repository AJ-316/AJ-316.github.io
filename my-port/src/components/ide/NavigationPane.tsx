import {CiFolderOn} from "react-icons/ci";
import NavButton from "./nav/NavButton.tsx";
import {useProject} from "./ProfileProvider.tsx";
import {NAV_ITEMS, toPath} from "./nav/navConfig.ts";

interface NavigationPaneProps {
    closeButton: React.ReactNode;
    onClose?: () => void | null;
}

const NavigationPane = ({closeButton, onClose}: NavigationPaneProps) => {
    const {project} = useProject();

    return (
        <div className="whitespace-nowrap overflow-hidden panel h-full">
            <div className="grid-cols-[auto_1fr_auto] text-gray-400 uppercase text-xs tracking-widest gap-3 title-pane">
                <CiFolderOn className="text-lg"/>
                File Explorer
                {closeButton}
            </div>

            <div className="p-2 pl-4">
                {NAV_ITEMS.map((item) => (
                    <NavButton
                        onClick={onClose}
                        key={item.segment}
                        to={toPath(item, project)}
                        label={item.label}
                        icon={item.icon}
                        color={item.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default NavigationPane;

