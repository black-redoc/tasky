import { map, atom } from "nanostores";

export const projectIdStore = atom(-1);
export const boardStore = map({} as any);

export const setProjectId = ({ projectId }: { projectId: number }) => {
  projectIdStore.set(projectId);
};

export const deleteTask = ({ id, status }: { id: number; status: string }) => {
  const tasks = boardStore.get()[status];

  if (!tasks) {
    return;
  }

  const updatedTasks = tasks.filter((task: any) => task.id !== id);
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

  const updatedTasks = tasks.map((task: any) => {
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

export const initialBoardStore = ({ boards }: { boards: any }) => {
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

  const updatedTasks = tasks.map((task: any) => {
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

  return tasks.map((task: any) => ({
    ...task,
    projectId: projectIdStore.get(),
  }));
};

export const updateLastTaskCreated = ({
  ...task
}) => {
  const { status } = task
  const boardTasks = boardStore.get()[status];

  if (!boardTasks) {
    return;
  }

  const rest = boardTasks.slice(0, boardTasks.length - 1);
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
  task: { [key: string]: any };
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
  task: { [key: string]: any };
}) => {
  const currentBoardTasks = boardStore.get()[task.status];
  const prevBoardTasks = boardStore.get()[task.oldStatus];
  if (task.oldStatus === task.status) {
    const updatedTasks = currentBoardTasks.map((obj: any) => {
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
  boardStore.setKey(task.oldStatus, [
    ...prevBoardTasks.filter((obj: any) => obj.id != task.id),
  ]);
};
