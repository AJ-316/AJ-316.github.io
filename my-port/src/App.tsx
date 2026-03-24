import {Route, Routes} from "react-router-dom";
import ProfileSelectionTemp from "./components/ProfileSelectionTemp.tsx";
import IDEMain from "./components/ide/IDEMain.tsx";
import TestPage from "./components/pages/TestPage.tsx";
import IDEHome from "./components/ide/projectselection/IDEHome.tsx";
import ProjectSelection from "./components/ide/projectselection/ProjectSelection.tsx";
import {useEffect, useState} from "react";
import AboutThePortfolio from "./components/ide/projectselection/AboutThePortfolio.tsx";

const App = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)");
        const applyMediaState = (matches: boolean) => {
            setIsMobile(matches);
        }

        applyMediaState(media.matches);

        const onChange = (event: MediaQueryListEvent) => {
            applyMediaState(event.matches);
        };

        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    return (
        <Routes>
            <Route path="/" element={<IDEHome isMobile={isMobile}/>}>
                <Route index element={<ProjectSelection/>}/>
                <Route path="home-about" element={<AboutThePortfolio />}/>
                <Route path="home-contact" element={<TestPage title="Contact Me"/>}/>
            </Route>

            <Route path="/ps" element={<ProfileSelectionTemp/>}/>

            <Route element={<IDEMain isMobile={isMobile}/>}>

                <Route path=":project/home" element={<TestPage lines={1000} title="Home"/>}/>
                <Route path=":project/about" element={<TestPage lines={1000} title="About"/>}/>
                <Route path=":project/projects" element={<TestPage lines={1000} title="ProjectSelection"/>}/>

                <Route path="contact" element={<TestPage lines={1000} title="Contact"/>}/>
                <Route path="skills" element={<TestPage lines={1000} title="Skills"/>}/>
            </Route>
        </Routes>
    )
};

export default App;
