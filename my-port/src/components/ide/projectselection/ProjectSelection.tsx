import {projects} from "../projects.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useProject} from "../ProfileProvider.tsx";

const ProjectSelection = () => {
    const navigate = useNavigate();
    const { setProject } = useProject();

    const handleNavigate = (project: string) => {
        setProject(project);
        navigate(`/${project}/home`);
    };

    return (
        <div className="flex flex-col gap-3">
            {projects.map((project, index) => (
                <>
                    {index != 0 && <hr className="my-4 text-gray-400/50"/>}
                    <div key={project.id}
                         className={`flex items-center gap-3 p-4 rounded-lg btn-i-active transition-all duration-300`}
                         onClick={() => handleNavigate(project.link)}
                    >
                        <div className={`font-code project-icon text-xl m-2 md:m-4 ${project.gradientClass}`}>
                            {project.id}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-medium">{project.name}</span>
                            <span className="font-code text-xs md:text-md font-medium">~portfolio/projects/{project.link}</span>
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}

export default ProjectSelection;