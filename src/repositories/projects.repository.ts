import {
  getProjects as getProjectsService,
  createProject as createProjectService,
  updateProject as updateProjectService,
} from "../services/projects.service";
import {
  projectsStore,
  updateProjectsStore,
  type ProjectType,
} from "../store/project.store";
import { uuidv4 } from "../services/uuid.service";
import { groupBy } from "../services/collections.service";

export const getProjects = async ({ isAuth }: { isAuth: boolean }) => {
  // Get projects from backend
  if (isAuth) {
    const projects = await getProjectsService();
    if (typeof projects == "string") {
      return { message: projects, isError: true };
    }
    updateProjectsStore({ projects });
  }
  // Get projects from client
  return null;
};

export const getProjectByTitle = ({
  title,
}: {
  title: string;
}) => {
  const projects = projectsStore.get();
  const filtered_project = Object.values(projects).filter(
    (project) => project.title == title
  )[0];
  return groupBy({ arr: filtered_project.tasks, criteria: "status" });
};

export const createProject = async ({
  isAuth,
  project,
}: {
  isAuth: boolean;
  project: ProjectType;
}) => {
  // Create project in backend
  if (isAuth) {
    const response = await createProjectService(project);
    if (typeof response === "string") {
      return {
        message: "Error while creating project",
        isError: true,
      };
    }
    updateProjectsStore({ projects: [response] });
    return { message: "Project created successfully!" };
  }
  const newProject = {
    ...project,
    id: uuidv4(),
  };
  updateProjectsStore({ projects: [newProject] });
  return { message: "Project created successfully!" };
};

export const updateProject = async ({
  isAuth,
  project,
}: {
  isAuth: boolean;
  project: ProjectType;
}) => {
  // Update project in backend
  if (isAuth) {
    const result = await updateProjectService(project);
    if (typeof result == "string") {
      return { message: result, isError: true };
    }
    updateProjectsStore({ projects: [project] });
  }
  // Update project in client
  updateProjectsStore({ projects: [project] });
  return {
    message: `Updated project ${project.title} successfully!`,
  };
};
