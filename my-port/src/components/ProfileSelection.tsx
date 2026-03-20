import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import {useProfile} from "./ide/ProfileProvider.tsx";

const ProfileSelection = () => {
    const [route, setRoute] = useState("/software-dev");
    const navigate = useNavigate();
    const { setProfile } = useProfile();

    const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setProfile(route);
        navigate(`/${route}/home`);
    };

    return (
        <>
            <div>
                <select onChange={(e) => setRoute(e.target.value)}>
                    <option value="/software-dev">Software Developer</option>
                    <option value="/game-dev">Game Developer</option>
                </select>
                <button onClick={handleNavigate} type="button">Go</button>
            </div>
        </>
    );
}

export default ProfileSelection;