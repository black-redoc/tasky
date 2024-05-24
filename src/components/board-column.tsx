import { useState, useCallback, useEffect } from "react";
import Button from "./button";
import TaskForm from "./task-form";
import {
  createTask,
  deleteTask as deleteTaskService,
} from "../services/tasks.service";
import {
  getTasksBoard,
  addTask,
  updateLastTaskCreated,
  boardStore,
  onChangeTaskTitle,
  setTaskHover,
  deleteTask as deleteTaskStore,
  type TasksType,
} from "../store/board.store";
import { useStore } from "@nanostores/react";

import DeleteConfirmation from "./delete-confirmation";
import { setToastMessage } from "../store/toast.store";
import Toast from "./toast";

const BoardColumn = ({
  boardName,
  projectId,
}: {
  boardName: string;
  projectId: number;
}) => {
  const $boardStore = useStore(boardStore);
  const tasks = useCallback(
    () => getTasksBoard({ status: boardName.toLowerCase() }),
    [$boardStore]
  );

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [deletingTask, setDeletingTask] = useState({} as TasksType);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    edit: false,
    id: 0,
    project_id: projectId,
    oldStatus: boardName,
    status: "",
  } as TasksType);

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
    setIsCreatingTask(false);
    updateLastTaskCreated({
      task: {
        title: response.title,
        project_id: projectId,
        status: status.toLowerCase(),
        id: response.id,
        description: response.description,
      },
    });
    if (Object.keys(response).includes("error")) {
      setToastMessage({ message: response, isError: true });
      return;
    }
    updateLastTaskCreated({
      ...response,
    });
    setToastMessage({
      message: `${currentTask.id !== 0 ? "Updated" : "Saved"} task`,
    });
  };

  const taskMouseEnter = ({ id, status }: { id: number; status: string }) =>
    setTaskHover({ id, status, hover: true });

  const taskMouseOut = ({ id, status }: { id: number; status: string }) =>
    setTaskHover({ id, status, hover: false });

  const maxLettersPerTitle = ({ word }: { word: string }) => {
    return word.slice(0, 15) + `${word.length > 15 ? "..." : ""}`;
  };

  const [isMobile, setIsMobile] = useState(
    navigator.userAgent.toLowerCase().includes("mobile")
  );

  const onSureDelete = async () => {
    const response = await deleteTaskService({ taskId: deletingTask.id });

    if (Object.keys(response).includes("error")) {
      setToastMessage({ message: response, isError: true });
      return;
    }
    setToastMessage({ message: "Deleted task" });
    deleteTaskStore({ ...deletingTask });
    setDeletingTask({} as TasksType);
  };

  const onCancelDelete = () => {
    setDeletingTask({} as TasksType);
  };

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(navigator.userAgent.toLowerCase().includes("mobile"));
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Toast />
      {taskFormActive ? (
        <TaskForm
          setTaskFormActive={setTaskFormActive}
          task={currentTask}
          setCurrentTask={setCurrentTask}
        />
      ) : (
        <></>
      )}
      {Object.values(deletingTask).length ? (
        <DeleteConfirmation
          title={deletingTask.title.substring(
            1 + deletingTask.title.indexOf(":")
          )}
          onCancel={onCancelDelete}
          onSure={onSureDelete}
        />
      ) : (
        <></>
      )}
      <ul className="sm:w-6/12 md:w-64 h-f bg-slate-200 rounded-xl pb-5">
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
        <section className="overflow-y-auto max-h-[30rem] scroll-smooth focus:scroll-auto min-w-[15rem]">
          {tasks()?.map((item: TasksType, i: number) =>
            !item.edit ? (
              <li
                onMouseOver={() =>
                  taskMouseEnter({
                    id: item.id,
                    status: item.status.toLowerCase(),
                  })
                }
                onMouseLeave={() =>
                  taskMouseOut({
                    id: item.id,
                    status: item.status.toLowerCase(),
                  })
                }
                key={i}
                className="h-10 w-full hover:text-white hover:bg-slate-700 my-1 py-2 px-3 rounded cursor-pointer flex flex-row justify-between"
              >
                <div
                  className="w-5/6"
                  onClick={() => {
                    setTaskFormActive(true);
                    setCurrentTask({
                      ...item,
                      oldStatus: item.status,
                    });
                  }}
                >
                  {maxLettersPerTitle({
                    word: item.title.substring(1 + item.title.indexOf(":")),
                  })}
                </div>
                {isMobile || item.hover ? (
                  <div
                    className="w-1/6"
                    onMouseUp={() =>
                      taskMouseEnter({
                        id: item.id,
                        status: item.status.toLowerCase(),
                      })
                    }
                    onClick={() =>
                      setDeletingTask({
                        title: item.title.substring(
                          1 + item.title.indexOf(":")
                        ),
                        status: item.status,
                        id: item.id,
                      } as TasksType)
                    }
                  >
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
                      className="cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-trash text-red-600 hover:text-red-500"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </div>
                ) : (
                  <></>
                )}
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

export default BoardColumn;
