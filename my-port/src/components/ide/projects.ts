export interface Project {
    id: string;
    name: string;
    link: string;
    gradientClass: string;
}

export const projects: Project[] = [
    {id: "SD", name: "Software-Developer", link: "software-dev", gradientClass: "project-icon-green"},
    {id: "GD", name: "Game-Developer", link: "game-dev", gradientClass: "project-icon-red"},
];
