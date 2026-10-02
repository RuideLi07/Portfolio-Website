import type { Project } from "./types";

export const RESEARCH_PROJECTS: Project[] = [
  // --- RESEARCH PROJECTS ---
  {
    id: "project-3",
    title: "Māori Population Study",
    type: "research",
    description: "Spatial demographic analysis and custom map rendering exploring regional population trends.",
    thumbnail: "https://picsum.photos/id/1019/1000/600",
    blocks: [
      {
        type: "image",
        src: "https://picsum.photos/id/1019/1000/600",
        alt: "Māori Population Spatial Analysis",
      },
      {
        type: "text",
        content:
          "This study utilizes GIS spatial analysis and custom cartographic data visualizations to map population shifts across urban centers.",
      },
    ],
  },
  {
    id: "project-4",
    title: "Project 4 Title",
    type: "research",
    description: "Brief overview or summary caption describing Project 4.",
    thumbnail: "https://picsum.photos/id/1025/1000/600",
    blocks: [
      {
        type: "image",
        src: "https://picsum.photos/id/1025/1000/600",
        alt: "Project 4 Showcase Image",
      },
      {
        type: "text",
        content:
          "An exploration of socio-technical systems and human-centered design interventions.",
      },
    ],
  },
];
