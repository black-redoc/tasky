import { atom, map } from "nanostores";

export const isProjectFormActive = atom(false);
export const projectsStore = map({} as any);
export const editingProjectStore = map({});

export const deleteProject = ({ id }: { id: number }) => {
  const newProjects = {} as any;
  const projects = projectsStore.get();
  for (let project of Object.values(projects) as any) {
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

export const updateProjectsStore = ({ projects }: { projects: Array<any> }) => {
  for (let project of projects) {
    projectsStore.setKey(project.id, { ...project });
  }
};

export const setEditingProjectStore = ({ ...project }) => {
  editingProjectStore.set({ ...project });
};
