import { updateLastTaskCreated, updateTaskStatus, deleteTask as deleteTaskStore, type TasksType } from "../store/board.store";
import {
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "../services/tasks.service";
import { uuidv4 } from "../services/uuid.service";

export const createTask = async ({
  isAuth,
  task,
  projectId,
}: {
  isAuth: boolean;
  task: TasksType;
  projectId: number;
}) => {
  // Create task in backend
  if (isAuth) {
    const response = await createTaskService({ task });
    if (Object.keys(response).includes("error")) {
      return { message: response, isError: true };
    }
    updateLastTaskCreated({
      task: {
        title: response.title,
        project_id: projectId,
        status: task.status.toLowerCase(),
        id: response.id,
        description: response.description,
      },
    });
  } else {
    // Create task in client
    updateLastTaskCreated({
      task: {
        title: task.title,
        project_id: projectId,
        status: task.status.toLowerCase(),
        id: uuidv4(),
        description: task.description,
      },
    });
  }
  return {
    message: `Saved task`,
  };
};
export const updateTask = async ({
  isAuth,
  task,
}: {
  isAuth: boolean;
  task: TasksType;
}) => {
  // Update task in backend
  if (isAuth) {
    const response = await updateTaskService({ task });
    if (Object.keys(response).includes("error")) {
      return { message: response, isError: true };
    }
  }
  // Update task in client
  updateTaskStatus({
    task: { ...task },
  });
  return {
    message: `Updated task`,
  };
};
export const deleteTask = async ({
  isAuth,
  task,
}: {
  isAuth: boolean;
  task: TasksType;
}) => {
  // Delete task in backend
  if (isAuth) {
    const response = await deleteTaskService({ taskId: task.id });
    if (Object.keys(response).includes("error")) {
      return { message: response, isError: true };
    }
  }
  // Delete task in client
  deleteTaskStore({ ...task });
  return { message: "Deleted task" }
};
