import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand } from "react-icons/tb";

interface NavDisplayButtonProps {
    setIsNavOpen: (value: React.SetStateAction<boolean>) => void;
    isNavOpen: boolean;
}

const NavDisplayButton = ({ setIsNavOpen, isNavOpen }: NavDisplayButtonProps) => {
    return (
        <button className="flex items-center justify-center btn-i-active text-white w-6.5 h-6.5" onClick={() => setIsNavOpen(isNavOpen)}>
            {isNavOpen ? <TbLayoutSidebarLeftExpand className="icon text-success"/> : <TbLayoutSidebarRightExpand className="icon text-error" />}
        </button>
    );
};

export default NavDisplayButton;
