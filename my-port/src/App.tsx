import Footer from "./components/Footer";
import TitlePage from "./components/TitlePage.tsx";
import SkillsPage from "./components/SkillsPage.tsx";
import ProjectPage from "./components/ProjectPage.tsx";
import Particles from "./components/Particles.tsx";
const App = () => {
    return (
        <>
            <div className="fixed min-h-screen w-full z-[-2] overflow-hidden port-bg-gradient-a" />

            <main className="snap-y snap-mandatory scroll-snap-stop always overflow-y-scroll relative min-w-0 h-screen w-full">

                <section className="snap-start h-screen">
                    <TitlePage />
                </section>
                <section className="snap-center h-screen">
                    <SkillsPage />
                </section>
                <section className="snap-center min-h-screen overflow-hidden">
                    <ProjectPage />
                </section>
            </main>

        </>
    );
};

export default App;
