import { atom } from "nanostores";

export const isCreateProjectActive = atom(false);
export const projectsStore = atom([] as any);

export const setIsCreateProjectActive = ({
  isCreatingProject,
}: {
  isCreatingProject: boolean;
}) => isCreateProjectActive.set(isCreatingProject);

export const updateProjectsStore = ({ projects }: { projects: Array<any> }) => {
  const currentProjects = projectsStore.get()
  projectsStore.set([...currentProjects, ...projects]);
};
