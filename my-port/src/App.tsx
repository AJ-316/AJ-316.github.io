import {Route, Routes} from "react-router-dom";
import ProfileSelection from "./components/ProfileSelection.tsx";
import IDEMain from "./components/ide/IDEMain.tsx";
import TestPage from "./components/pages/TestPage.tsx";

const App = () => {

    return (
        /*<div className={`grid h-dvh grid-rows-[auto_1fr_auto] bg-gray-600 text-black font-bold`}>
            <div className="text-xl">
                Header
            </div>

            {<div className="flex whitespace-pre overflow-y-auto bg-white">
                {/!*gutter*!/}
                <div className="min-w-0">
                    <div className="border-r-1 shrink-0 bg-blue-400 mr-2">
                        {Array.from({length: 90}).map((_, i) => (
                            <h1 className="bg-yellow-400/30">{(i + 1)}</h1>
                        ))}
                    </div>
                </div>

                {/!*content*!/}
                <div className="flex-1 min-w-0">
                    <div className="overflow-x-auto overflow-y-hidden">
                        <div className="min-w-max whitespace-pre bg-blue-400">
                            <div className="flex flex-col">
                                {Array.from({length: 10}).map((_, i) => (
                                    `Test Page [${i + 1}] A really long line that should overflow and cause horizontal scrolling\n`/!*<h1 className="bg-yellow-400/30"></h1>*!/
                                ))}

                                <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" className="scale-25" />

                                {Array.from({length: 20}).map((_, i) => (
                                    `Test Page [${i + 1}] A really long line that should overflow and cause horizontal scrolling\n`/!*<h1 className="bg-yellow-400/30"></h1>*!/
                                ))}
                                <img src="https://imgs.search.brave.com/fJnq7mT0OF3o5pJobCZOTnsIanVZaEnzoCeBooOobtI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE3/MzkyMzU3Ni9waG90/by9hYnN0cmFjdC1x/dWFudHVtLWNvbXB1/dGluZy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9cGpBelA4/V213X2xHM19sV3Jv/cnRPM1liMHN0Q1Zy/NDcxQ09QSkdxNHBw/VT0" className="scale-25" />

                                {Array.from({length: 30}).map((_, i) => (
                                    `Test Page [${i + 1}] A really long line that should overflow and cause horizontal scrolling\n`/!*<h1 className="bg-yellow-400/30"></h1>*!/
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="text-xl">
                Footer
            </div>
        </div>*/
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
