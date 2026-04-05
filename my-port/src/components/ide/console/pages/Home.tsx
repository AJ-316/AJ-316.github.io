import EditorItem from "./EditorItem.tsx";
import TestPage from "./TestPage.tsx";
import {useOutletContext} from "react-router-dom";
import CodeView from "./CodeView.tsx";
import rawCode from '../../../../pagecode/home.java?raw';

const Home = () => {
    const {isOutput} = useOutletContext<{ isOutput: boolean }>();

    return (
        isOutput ? <TestPage title={"Home"} lines={50}/> :
            <div className="editor-container">
                <EditorItem className="whitespace-pre leading-6">
                    <CodeView code={rawCode}/>
                </EditorItem>
            </div>
    )
}

export default Home;