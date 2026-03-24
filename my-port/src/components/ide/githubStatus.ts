import {useEffect, useState} from "react";

interface GithubData {
    lastCommitDate: string;
}

const useGithubStatus = (username: string) => {
    const [data, setData] = useState<GithubData | null>(null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const res = await fetch(
                    `https://api.github.com/users/${username}/events/public`
                );
                const events = await res.json();

                const pushEvent = events.find(
                    (e: { type: string; }) => e.type === "PushEvent"
                );

                if (pushEvent) {
                    setData({
                        lastCommitDate: pushEvent.created_at,
                    });
                }
            } catch (err) {
                console.error("GitHub fetch failed", err);
            }
        };

        fetchData().then(r => r);
    }, [username]);

    return data;
};

export default useGithubStatus;