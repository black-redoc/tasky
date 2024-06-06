const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

export const createTask = async ({ ...task }) =>
  await fetch(`${BACKEND_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((data) => data.json()).catch((error) => `Error: ${error.message}`);

export const updateTask = async ({ ...task }) =>
  await fetch(`${BACKEND_URL}/tasks/`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((data) => data.json()).catch((error) => `Error: ${error.message}`);

export const deleteTask = async ({ taskId }: { taskId: number | string }) =>
  await fetch(`${BACKEND_URL}/tasks/${taskId}`, {
    method: "DELETE",
  }).then((data) => data.json()).catch((error) => `Error: ${error.message}`);
