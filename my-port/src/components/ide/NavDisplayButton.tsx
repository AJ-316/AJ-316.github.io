import {
    TbLayoutSidebarLeftExpand,
    TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpand, TbLayoutSidebarRightExpandFilled
} from "react-icons/tb";

interface NavDisplayButtonProps {
    setIsNavOpen: (value: React.SetStateAction<boolean>) => void;
    isNavOpen: boolean;
}

const NavDisplayButton = ({setIsNavOpen, isNavOpen}: NavDisplayButtonProps) => {
    return (
        <div className="btn-i-active" onClick={() => setIsNavOpen(isNavOpen)}>
            {isNavOpen ? <TbLayoutSidebarLeftExpand className="w-4.5 h-4.5 md:w-5 md:h-5 -m-0.5 text-success"/> :
                <TbLayoutSidebarRightExpand className="w-4.5 h-4.5 md:w-5 md:h-5 -m-0.5 text-error"/>}
        </div>
    );
};

export default NavDisplayButton;
