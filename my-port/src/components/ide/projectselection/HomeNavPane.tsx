import NavButton from "../nav/NavButton.tsx";

interface HomeNavItem {
    label: string;
    url: string;
}

const HOME_NAV_ITEMS: HomeNavItem[] = [
    {label: "Projects", url: "/"},
    {label: "About the Portfolio", url: "/home-about"},
    {label: "Contact Me", url: "/home-contact"},
];

interface HomeNavPaneProps {
    onClose?: () => void
}

const HomeNavPane = ({onClose}: HomeNavPaneProps) => {
    return (
        <div className="flex flex-col whitespace-nowrap">
            {HOME_NAV_ITEMS.map((item, index) => (
                <>
                    <NavButton
                        onClick={onClose}
                        key={item.label + index}
                        to={item.url}
                        label={item.label}
                        className="p-2"
                    />
                    {index == 0 && <hr className="my-4 text-gray-40"/>}
                </>
            ))}
        </div>
    )
}

export default HomeNavPane;