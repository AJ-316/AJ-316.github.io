import HeaderPane from "./HeaderPane.tsx";
import NavigationPane from "./NavigationPane.tsx";
import FooterPane from "./FooterPane.tsx";
import {Outlet, useParams} from "react-router-dom";
import {useProfile} from "./ProfileProvider.tsx";
import {useEffect} from "react";

const IDEMain = () => {
    const { profile: urlProfile } = useParams();
    const { setProfile } = useProfile();

    useEffect(() => {
        if (urlProfile) {
            setProfile(urlProfile);
        }
    }, [urlProfile, setProfile]);

    return (
        <div className="grid h-dvh grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr] bg-neutral-950">
            <header className="col-span-2 p-3">
                <HeaderPane />
            </header>

            <nav className="p-3">
                <NavigationPane/>
            </nav>

            <main className="min-h-0 overflow-y-auto p-4">
                <Outlet />
            </main>

            <footer className="col-span-2 p-3">
                <FooterPane/>
            </footer>
        </div>
    );
}

export default IDEMain;