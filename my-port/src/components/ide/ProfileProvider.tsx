import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ProjectContextType = {
    project: string | null;
    setProject: (project: string | null) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY = "ide.activeProfile";

const normalizeProfile = (value: string | null): string | null => {
    if (!value) return null;
    return value.replace(/^\/+/, "");
};

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [project, setProjectState] = useState<string | null>(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return normalizeProfile(stored);
    });

    const setProject = (nextProfile: string | null) => {
        setProjectState(normalizeProfile(nextProfile));
    };

    useEffect(() => {
        if (project) {
            window.localStorage.setItem(STORAGE_KEY, project);
            return;
        }

        window.localStorage.removeItem(STORAGE_KEY);
    }, [project]);

    return (
        <ProjectContext.Provider value={{ project, setProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject(): ProjectContextType {
    const context = useContext(ProjectContext);

    if (!context) {
        throw new Error("useProfile must be used inside ProfileProvider");
    }

    return context;
}