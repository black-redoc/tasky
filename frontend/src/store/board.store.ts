import { map, atom } from "nanostores";

export const projectIdStore = atom(-1)
export const boardStore = map({} as any);


export const setProjectId = ({ projectId }: { projectId: number }) => {
  projectIdStore.set(projectId)
}

export const initialBoardStore = ({ boards }: { boards: any }) => {
  boardStore.set({
    todo: [],
    doing: [],
    blocked: [],
    done: [],
    ...boards
  })
}

export const onChangeTaskTitle = ({ status, taskTitle, taskId }: { status: string; taskTitle: string; taskId: number }) => {
  const tasks = boardStore.get()[status]

  if (!tasks) {
    return;
  }

  const updatedTasks = tasks.map((task: any) => {
    if (task.id === taskId) {
      return {
        ...task,
        title: taskTitle
      }
    }
    return task
  })

  boardStore.setKey(status, updatedTasks)
}
export const getTasksBoard = ({ status }: { status: string }) => {
  const tasks = boardStore.get()[status];

  if (!tasks) {
    return;
  }

  return tasks.map((task: any) => ({
    ...task,
    projectId: projectIdStore.get(),
  }))

}

export const updateLastTaskCreated = ({ status, newId }: { status: string; newId: number }) => {
  const boardTasks = boardStore.get()[status];

  if (!boardTasks) {
    return;
  }

  let [last, ...rest] = boardTasks.reverse()
  boardStore.setKey(status, [
    ...rest,
    {
      ...last,
      id: newId,
      edit: false
    }
  ])
}

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
  console.log({ boardStore })
};

export const updateTaskStatus = ({
  currentStatus,
  prevStatus,
  task,
}: {
  currentStatus: string;
  prevStatus: string;
  task: { [key: string]: any };
}) => {
  const currentBoardTasks = boardStore.get()[currentStatus];
  const prevBoardTasks = boardStore.get()[prevStatus];
  if (!currentBoardTasks) {
    return;
  }
  if (!prevBoardTasks) {
    return;
  }

  boardStore.setKey(currentStatus, [
    ...currentBoardTasks,
    task
  ])
  boardStore.setKey(prevStatus, [
    ...prevBoardTasks.filter((obj: any) => obj.id != task.id)
  ])
};
