import { BACKEND_URL } from "../constants/urls";

export const getProjects = async () =>
  await fetch(`${BACKEND_URL}/projects/`);

export const createProject = async ({ ...project }) =>
  await fetch(`${BACKEND_URL}/projects/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(project),
  });

export const updateProject = async ({ ...project }) =>
  await fetch(`${BACKEND_URL}/projects/`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(project),
  });

export const deleteProject = async ({ id }: { id: number }) =>
  await fetch(`${BACKEND_URL}/projects/${id}`);
