import { map, atom } from "nanostores";

export type TasksType = {
  id: number;
  title: string;
  status: string;
  description: string;
  edit?: boolean;
  oldStatus?: string;
  project_id?: number;
  hover?: boolean;
}

export type BoardStoreType = {
  [status: string]: TasksType[]
}

export const projectIdStore = atom(-1);
export const boardStore = map({} as BoardStoreType);

export const setProjectId = ({ projectId }: { projectId: number }) => {
  projectIdStore.set(projectId);
};

export const deleteTask = ({ id, status }: { id: number; status: string }) => {
  const tasks = boardStore.get()[status];

  if (!tasks) {
    return;
  }

  const updatedTasks = tasks.filter((task: TasksType) => task.id !== id);
  boardStore.setKey(status, updatedTasks);
};

export const setTaskHover = ({
  id,
  status,
  hover,
}: {
  id: number;
  status: string;
  hover: boolean;
}) => {
  const tasks = boardStore.get()[status];

  if (!tasks) {
    return;
  }

  const updatedTasks = tasks.map((task: TasksType) => {
    if (task.id === id) {
      return {
        ...task,
        hover,
      };
    }
    return task;
  });

  boardStore.setKey(status, updatedTasks);
};

export const initialBoardStore = ({ boards }: { boards: BoardStoreType }) => {
  boardStore.set({
    todo: [],
    doing: [],
    blocked: [],
    done: [],
    ...boards,
  });
};

export const onChangeTaskTitle = ({
  status,
  taskTitle,
  taskId,
}: {
  status: string;
  taskTitle: string;
  taskId: number;
}) => {
  const tasks = boardStore.get()[status];

  if (!tasks) {
    return;
  }

  const updatedTasks = tasks.map((task: TasksType) => {
    if (task.id === taskId) {
      return {
        ...task,
        title: taskTitle,
      };
    }
    return task;
  });

  boardStore.setKey(status, updatedTasks);
};
export const getTasksBoard = ({ status }: { status: string }) => {
  const tasks = boardStore.get()[status];

  if (!tasks) {
    return;
  }

  return tasks.map((task: TasksType) => ({
    ...task,
    projectId: projectIdStore.get(),
  }));
};

export const updateLastTaskCreated = ({
  task
}: { task: TasksType }) => {
  if (!task) {
    return;
  }
  const { status } = task
  const boardTasks = boardStore.get()[status];

  if (!boardTasks) {
    return;
  }

  const rest = boardTasks.filter((task) => task.id != 0)//.slice(0, boardTasks.length - 1);
  boardStore.setKey(status, [
    ...rest,
    {
      ...task,
      edit: false,
    },
  ]);
};

export const addTask = ({
  status,
  task,
}: {
  status: string;
  task: TasksType;
}) => {
  const boardTasks = boardStore.get()[status];

  if (!boardTasks) {
    return;
  }

  boardStore.setKey(status, [...boardTasks, { ...task, edit: true }]);
};

export const updateTaskStatus = ({
  task,
}: {
  task: TasksType;
}) => {
  const currentBoardTasks = boardStore.get()[task.status];
  const prevBoardTasks = boardStore.get()[task.oldStatus!];
  if (task.oldStatus === task.status) {
    const updatedTasks = currentBoardTasks.map((obj: TasksType) => {
      if (obj.id === task.id) {
        return {
          ...task
        }
      }
      return obj
    })
    boardStore.setKey(task.status, [...updatedTasks])
    return
  }

  boardStore.setKey(task.status, [...currentBoardTasks, task]);
  boardStore.setKey(task.oldStatus!, [
    ...prevBoardTasks.filter((obj: TasksType) => obj.id != task.id),
  ]);
};
