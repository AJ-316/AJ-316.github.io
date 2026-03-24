import {useParams} from "react-router-dom";

interface TestPageProps {
    title: string;
    lines?: number;
}

const TestPage = (prop: TestPageProps) => {
    const {project} = useParams();

    return (
        <div className="w-full whitespace-pre">
            <h1>
                {Array.from({length: prop.lines ? prop.lines : 1})
                    .map((_, i) => `Test Page [${i + 1}] ${prop.title}${project ? ` ${project}` : ""}`)
                    .join("\n")}
            </h1>
            {/*{Array.from({ length: 1000 })
                .map((_, i) => <h1>Test Page [{i + 1}] {prop.title}{project ? project : ""}</h1>)}*/}
        </div>
    )
}

export default TestPage;