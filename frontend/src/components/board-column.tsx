import { useState, useCallback } from "react";
import Button from "./button";
import TaskForm from "./task-form";
import { createTask } from "../services/tasks.service";
import {
  getTasksBoard,
  addTask,
  updateLastTaskCreated,
  boardStore,
  onChangeTaskTitle,
} from "../store/board.store";
import { useStore } from "@nanostores/react";

export default ({
  boardName,
  projectId,
}: {
  boardName: string;
  projectId: number;
}) => {
  const $boardStore = useStore(boardStore);
  const tasks: any = useCallback(
    () => getTasksBoard({ status: boardName.toLowerCase() }),
    [$boardStore]
  );

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    edit: false,
    id: 0,
    project_id: projectId,
    oldStatus: boardName,
    status: "",
  });

  const [taskFormActive, setTaskFormActive] = useState(false);
  const addNewTask = () => {
    if (isCreatingTask) {
      return;
    }
    setIsCreatingTask(true);
    addTask({
      status: boardName.toLowerCase(),
      task: {
        title: "",
        edit: true,
        description: "",
        id: 0,
        status: boardName.toLowerCase(),
        project_id: projectId,
      },
    });
  };

  const createNewTask = async ({
    title,
    status,
  }: {
    title: string;
    status: string;
  }) => {
    const response = await createTask({
      title,
      project_id: projectId,
      status: status.toLowerCase(),
    });
    if (typeof response == "string") {
      // TODO: implement error use case
    } else {
      updateLastTaskCreated({
        status: status.toLowerCase(),
        newId: response.id,
      });
    }
    setIsCreatingTask(false);
  };
  return (
    <>
      {taskFormActive ? (
        <TaskForm
          setTaskFormActive={setTaskFormActive}
          task={currentTask}
          setCurrentTask={setCurrentTask}
        />
      ) : (
        <></>
      )}
      <ul className="w-64 h-f bg-slate-200 rounded-xl pb-5">
        <h1 className="px-3 py-2 text-white font-bold bg-cyan-700 rounded-t flex flex-row justify-between">
          <p>{boardName}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-checkbox cursor-pointer hover:text-slate-700"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 11l3 3l8 -8" />
            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
          </svg>
        </h1>
        <section className="overflow-y-auto max-h-[30rem] scroll-smooth focus:scroll-auto">
          {tasks().map((item: any, i: number) =>
            !item.edit ? (
              <li
                key={i}
                className="h-10 w-f hover:text-white hover:bg-slate-700 my-1 py-2 px-3 rounded cursor-pointer"
                onClick={() => {
                  setTaskFormActive(true);
                  setCurrentTask({
                    ...item,
                    oldStatus: item.status,
                  });
                }}
              >
                {item.title.substring(1 + item.title.indexOf(":"))}
              </li>
            ) : (
              <section className="flex flex-row px-2 my-1 py-2" key={i}>
                <input
                  autoFocus
                  className="w-5/6 outline-none px-2 rounded"
                  onChange={(e) =>
                    onChangeTaskTitle({
                      status: item.status.toLowerCase(),
                      taskTitle: e.target.value,
                      taskId: item.id,
                    })
                  }
                />
                <svg
                  onClick={() =>
                    createNewTask({ title: item.title, status: boardName })
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-checkbox text-cyan-700 w-1/6 hover:text-slate-700"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 11l3 3l8 -8" />
                  <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                </svg>
              </section>
            )
          )}
          <li className="flex justify-center items-center">
            <Button onClick={addNewTask} textColor="text-cyan-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
              </svg>
            </Button>
          </li>
        </section>
      </ul>
    </>
  );
};
