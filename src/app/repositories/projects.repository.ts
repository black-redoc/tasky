import {
  getProjects as getProjectsService,
  createProject as createProjectService,
  updateProject as updateProjectService,
} from "../services/projects.service";
import { groupBy } from "../services/collections.service";
import { uuidv4 } from "../services/uuid.service";
import { ProjectStateType } from "../reducers/projects.reducer";
import { TaskStateType } from "../reducers/tasks.reducer";

export const getProjects = async ({
  isAuth,
  projectDispatch,
  isLoadingDispatch,
}: {
  isAuth: boolean;
  projectDispatch: any;
  isLoadingDispatch: any;
}) => {
  // Get projects from backend
  isLoadingDispatch({ type: "LOADING" });
  if (isAuth) {
    const projects = await getProjectsService();
    if (typeof projects == "string") {
      isLoadingDispatch({ type: "LOADED" });
      return { message: projects, isError: true };
    }
    projectDispatch({ type: "ADD_ALL", payload: projects });
  }
  isLoadingDispatch({ type: "LOADED" });
  // Get projects from client
  return;
};

export const getProjectByTitle = ({
  title,
  projectState,
}: {
  title: string;
  projectState: ProjectStateType;
}): [TaskStateType, number] | null => {
  const filteredProject = projectState.projects.filter(
    (project: any) => project.title == title
  )[0];
  if (!filteredProject) {
    return null;
  }
  const tasks = filteredProject.tasks;
  return [
    groupBy({ arr: tasks, criteria: "status" }) as TaskStateType,
    filteredProject.id as number,
  ];
};

export const createProject = async ({
  isAuth,
  project,
  projectDispatch,
}: {
  isAuth: boolean;
  project: any;
  projectDispatch: any;
}) => {
  // Create project in backend
  let response;
  if (isAuth) {
    response = await createProjectService(project);
    if (typeof response === "string") {
      return {
        message: "Error while creating project",
        isError: true,
      };
    }
  }
  const newProject = {
    ...project,
    id: uuidv4(),
  };
  projectDispatch({ type: "CREATE_PROJECT", payload: response ?? newProject });
  return { message: "Project created successfully!" };
};

export const updateProject = async ({
  isAuth,
  project,
  projectDispatch,
}: {
  isAuth: boolean;
  project: any;
  projectDispatch: any;
}) => {
  // Update project in backend
  if (isAuth) {
    const result = await updateProjectService(project);
    if (result != 200) {
      return { message: "Error while updating project", isError: true };
    }
  }
  // // Update project in client
  projectDispatch({ type: "UPDATE_PROJECT", payload: project });
  return {
    message: `Updated project ${project.title} successfully!`,
  };
};
