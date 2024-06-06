import { atom, map } from "nanostores";

export type ProjectType = {
  id: number | string;
  title: string;
  description: string;
  tasks: {
    id: number;
    title: string;
    status: string;
  }[]
}

export type ProjectStoreType = {
  [id: number | string]: ProjectType
}

export const isProjectFormActive = atom(false);
export const projectsStore = map({} as ProjectStoreType);
export const editingProjectStore = map({} as ProjectType);

export const deleteProject = ({ id }: { id: number | string }) => {
  const newProjects = {} as ProjectStoreType;
  const projects = projectsStore.get();
  for (const project of Object.values(projects)) {
    if (project.id === id) {
      continue;
    }
    newProjects[project.id] = project;
  }

  projectsStore.set(newProjects);
};

export const setIsProjectFormActive = ({
  projectFormActive,
}: {
  projectFormActive: boolean;
}) => isProjectFormActive.set(projectFormActive);

export const updateProjectsStore = ({ projects }: { projects: Array<ProjectType> }) => {
  for (const project of projects) {
    projectsStore.setKey(project.id, { ...project });
  }
};

export const setEditingProjectStore = ({ project }: { project: ProjectType }) => {
  editingProjectStore.set({ ...project });
};
