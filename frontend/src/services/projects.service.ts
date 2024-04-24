const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;


export const getProjectByTitle = async ({ title }: { title: string }) => await fetch(
  `${BACKEND_URL}/projects/${title}/`,
  {
    headers: {
      "content-type": "application/json"
    }
  }
).then((data) => data.json()).catch((error) => `Error: ${error.message}`)

export const getProjects = async () =>
  await fetch(`${BACKEND_URL}/projects/`, {
    headers: {
      "content-type": "application/json",
    },
  }).then(data => data.json()).catch((error) => `Error: ${error.message}`);

export const createProject = async ({ ...project }) =>
  await fetch(`${BACKEND_URL}/projects/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(project),
  }).then((data) => data.status).catch((error) => `Error: ${error.message}`);

export const updateProject = async ({ ...project }) =>
  await fetch(`${BACKEND_URL}/projects/`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(project),
  }).then((data) => data.status).catch((error) => `Error: ${error.message}`);

export const deleteProject = async ({ id }: { id: number }) =>
  await fetch(`${BACKEND_URL}/projects/${id}`).then((data) => data.status).catch(
    (error) => `Error: ${error.message}`
  );
