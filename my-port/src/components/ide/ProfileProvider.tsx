import {createContext, ReactNode, useContext, useState} from "react";

type ProfileContextType = {
    profile: string | null;
    setProfile: (profile: string | null) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<string | null>(null);

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