import {Route, Routes} from "react-router-dom";
import TestPage from "./console/pages/TestPage.tsx";
import {Project} from "./projects.ts";

interface ContentPaneProps {
    project: Project;
}

const ContentPane = ({project}: ContentPaneProps) => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<TestPage title={"Home"}/>}/>
                <Route path="/about" element={<TestPage title={"About"}/>}/>
                <Route path="/projects" element={<TestPage title={"ProjectSelection"}/>}/>
                <Route path="/contact" element={<TestPage title={"Contact"}/>}/>
            </Routes>
        </>
    );
}

export default ContentPane;