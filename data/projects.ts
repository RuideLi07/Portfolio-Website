import { DESIGN_PROJECTS } from "./design-projects";
import { RESEARCH_PROJECTS } from "./research-projects";
import type { Project } from "./types";

export type { PracticeImpactPair, TableRow, PipelineStep, ContentBlock, Project } from "./types";

export const PROJECTS: Project[] = [...DESIGN_PROJECTS, ...RESEARCH_PROJECTS];
