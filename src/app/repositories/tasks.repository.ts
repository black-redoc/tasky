// import { updateLastTaskCreated, updateTaskStatus, deleteTask as deleteTaskStore, type TasksType, boardStore } from "../store/board.store";
import { ActionState, TaskType } from "../reducers/tasks.reducer";
import { ActionState as ProjectActionState, ProjectType } from "../reducers/projects.reducer"
import {
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "../services/tasks.service";
import { uuidv4 } from "../services/uuid.service";

export const createTask = async ({
  isAuth,
  task,
  project_id,
  taskDispatch,
  projectDispatch,
}: {
  isAuth: boolean;
  task: TaskType;
  project_id: number;
  taskDispatch: (action: ActionState) => void,
  projectDispatch: (action: ProjectActionState) => void
}) => {
  // Create task in backend
  let id = uuidv4()

  if (isAuth) {
    const response = await createTaskService({ task });
    if (Object.keys(response).includes("error")) {
      return { message: response, isError: true };
    }
    id = response.id
  }
  // Create task in client
  taskDispatch({
    type: 'UPDATE_LAST_TASK_CREATED',
    payload: {
      task: {
        ...task,
        project_id,
        id
      }
    }
  })
  projectDispatch({
    type: 'ADD_TASK',
    payload: {
      tasks: [
        {
          ...task,
          project_id,
          id
        }
      ]

    } as ProjectType
  })
  return {
    message: `Saved task`,
  };
};
export const updateTask = async ({
  isAuth,
  task,
  taskDispatch,
  projectDispatch
}: {
  isAuth: boolean;
  task: TaskType;
  taskDispatch: (action: ActionState) => void,
  projectDispatch: (action: ProjectActionState) => void
}) => {
  // Update task in backend
  if (isAuth) {
    const response = await updateTaskService({ task });
    if (Object.keys(response).includes("error")) {
      return { message: response, isError: true };
    }
  }
  // Update task in client
  taskDispatch({
    type: 'UPDATE_TASK',
    payload: {
      task
    }
  })
  projectDispatch({
    type: 'UPDATE_TASK',
    payload: {
      tasks: [task]
    } as ProjectType
  })
  return {
    message: `Updated task`,
  };
};
export const deleteTask = async ({
  isAuth,
  task,
  taskDispatch,
}: {
  isAuth: boolean;
  task: TaskType;
  taskDispatch: (action: ActionState) => void
}) => {
  // Delete task in backend
  if (isAuth) {
    const response = await deleteTaskService({ taskId: task.id });
    if (Object.keys(response).includes("error")) {
      return { message: response, isError: true };
    }
  }
  // Delete task in client
  taskDispatch({
    type: 'DELETE_TASK',
    payload: {
      task
    }
  })
  return { message: "Deleted task" }
};
