import { CiFolderOn } from "react-icons/ci";
import NavButton from "./nav/NavButton.tsx";
import { useProfile } from "./ProfileProvider.tsx";
import { NAV_ITEMS, toPath } from "./nav/navConfig.ts";

interface NavigationPaneProps {
    closeButton: React.ReactNode;
    onClose?: () => void | null;
}

const NavigationPane = ({ closeButton, onClose }: NavigationPaneProps) => {
    const { profile } = useProfile();

    return (
        <div className="whitespace-nowrap overflow-hidden panel">
            <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[18px] text-gray-400 uppercase items-center text-xs tracking-widest gap-3 m-1 p-3 border-b-2 shadow-black shadow-2xl border-gray-800 rounded-lg">
                <CiFolderOn className="text-lg" /> File Explorer
                {closeButton}
            </div>

            <div className="p-2 pl-4">
                {NAV_ITEMS.map((item) => (
                    <NavButton
                        onClick={onClose}
                        key={item.segment}
                        to={toPath(item, profile)}
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

