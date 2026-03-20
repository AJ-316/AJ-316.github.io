import {useParams} from "react-router-dom";

interface TestPageProps {
    title: string;
}

const TestPage = (prop: TestPageProps) => {
    const { profile } = useParams();

    return (
        <>
            <h1>Test Page "{prop.title}{profile && " (" + profile + ")"}"</h1>
        </>
    )
}

export default TestPage;