import { BACKEND_URL } from "../constants/urls";

export const createProject = ({ ...task }) =>
  fetch(`${BACKEND_URL}/tasks/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(task),
  });

export const updateTask = ({ ...task }) =>
  fetch(`${BACKEND_URL}task/`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(task),
  });

export const deleteTask = ({ taskId }: { taskId: number }) =>
  fetch(`${BACKEND_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
