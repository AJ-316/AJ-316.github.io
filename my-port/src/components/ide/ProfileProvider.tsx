import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ProfileContextType = {
    profile: string | null;
    setProfile: (profile: string | null) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = "ide.activeProfile";

const normalizeProfile = (value: string | null): string | null => {
    if (!value) return null;
    return value.replace(/^\/+/, "");
};

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfileState] = useState<string | null>(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return normalizeProfile(stored);
    });

    const setProfile = (nextProfile: string | null) => {
        setProfileState(normalizeProfile(nextProfile));
    };

    useEffect(() => {
        if (profile) {
            window.localStorage.setItem(STORAGE_KEY, profile);
            return;
        }

        window.localStorage.removeItem(STORAGE_KEY);
    }, [profile]);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile(): ProfileContextType {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error("useProfile must be used inside ProfileProvider");
    }

    return context;
}