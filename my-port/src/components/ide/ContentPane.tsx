import { Routes, Route } from "react-router-dom";
import TestPage from "../pages/TestPage.tsx";
import {Profile} from "./profiles.ts";

interface ContentPaneProps {
    profile: Profile;
}

const ContentPane = ({profile}: ContentPaneProps) => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<TestPage title={"Home"}/>} />
                <Route path="/about" element={<TestPage title={"About"}/>} />
                <Route path="/projects" element={<TestPage title={"Projects"}/>} />
                <Route path="/contact" element={<TestPage title={"Contact"}/>} />
            </Routes>
        </>
    );
}

export default ContentPane;