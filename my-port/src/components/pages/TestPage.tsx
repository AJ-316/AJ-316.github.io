import {useParams} from "react-router-dom";

interface TestPageProps {
    title: string;
}

const TestPage = (prop: TestPageProps) => {
    const {profile} = useParams();

    return (
        <div className="w-full whitespace-pre">
            <h1>
                {Array.from({length: 1000})
                    .map((_, i) => `Test Page [${i + 1}] ${prop.title}${profile ? ` ${profile}` : ""}`)
                    .join("\n")}
            </h1>
            {/*{Array.from({ length: 1000 })
                .map((_, i) => <h1>Test Page [{i + 1}] {prop.title}{profile ? profile : ""}</h1>)}*/}
        </div>
    )
}

export default TestPage;