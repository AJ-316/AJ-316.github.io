import {HashRouter} from 'react-router-dom'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ProfileProvider} from "./components/ide/ProfileProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <ProfileProvider>
        <HashRouter>
            <App/>
        </HashRouter>
    </ProfileProvider>
)
