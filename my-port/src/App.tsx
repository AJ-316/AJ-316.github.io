import {Route, Routes} from "react-router-dom";
import ProfileSelection from "./components/ProfileSelection.tsx";
import IDEMain from "./components/ide/IDEMain.tsx";
import TestPage from "./components/pages/TestPage.tsx";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<ProfileSelection/>}/>
            <Route element={<IDEMain />}>

                <Route path=":profile/home" element={<TestPage title="Home" />} />
                <Route path=":profile/about" element={<TestPage title="About" />} />
                <Route path=":profile/projects" element={<TestPage title="Projects" />} />

                <Route path="contact" element={<TestPage title="Contact" />} />
                <Route path="skills" element={<TestPage title="Skills" />} />
            </Route>
        </Routes>
    )
};

export default App;
