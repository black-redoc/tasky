const BACKEND_URL = import.meta.env.BACKEND_URL;

export const createTask = async ({ ...task }) =>
  // await fetch(`${BACKEND_URL}/tasks/`, {
  await fetch(`http://127.0.0.1:8000/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((data) => data.json()).catch((error) => `Error: ${error.message}`);

export const updateTask = async ({ ...task }) =>
  await fetch(`${BACKEND_URL}task/`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((data) => data.json()).catch((error) => `Error: ${error.message}`);

export const deleteTask = async ({ taskId }: { taskId: number }) =>
  await fetch(`${BACKEND_URL}/tasks/${taskId}`, {
    method: "DELETE",
  }).then((data) => data.json()).catch((error) => `Error: ${error.message}`);
