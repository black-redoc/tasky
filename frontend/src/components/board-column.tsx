import { useState } from "react";
import Button from "./button";
import TaskForm from "./task-form";
import { createTask } from "../services/tasks.service";

export default ({
  items,
  boardName,
  projectId,
}: {
  items: string[];
  boardName: string;
  projectId: number;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [tasks, setTasks] = useState(
    items.map((item) => ({ title: item, edit: false }))
  );
  const [taskFormActive, setTaskFormActive] = useState(false);
  const addNewTask = () => {
    setTasks([...tasks, { title: "", edit: true }]);
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
      setTasks([...tasks.slice(0, -1)]);
      console.log(response);
    } else {
      setTasks([
        ...tasks.slice(0, -1),
        { ...tasks[tasks.length - 1], edit: false },
      ]);
    }
  };
  return (
    <>
      {taskFormActive ? (
        <TaskForm setTaskFormActive={setTaskFormActive} />
      ) : (
        <></>
      )}
      <ul className="min-w-64 h-f bg-slate-200 rounded-xl pb-5">
        <h1 className="px-3 py-2 text-white font-bold bg-cyan-700 rounded-t flex flex-row justify-between">
          {editMode ? (
            <input
              className="w-52 text-gray-600 font-normal focus:ring-cyan-600 ring-inset rounded-md block border-0 ring-1 focus:ring-2 focus:ring-inset leading-6 focus:border-none appearance-none outline-none px-2"
              type="text"
            />
          ) : (
            <p>{boardName}</p>
          )}
          {editMode ? (
            <svg
              onClick={() => setEditMode(!editMode)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-checkbox cursor-pointer hover:text-slate-700"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 11l3 3l8 -8" />
              <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-edit cursor-pointer hover:text-slate-700"
              onClick={() => setEditMode(!editMode)}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          )}
        </h1>
        <section className="overflow-y-auto max-h-[30rem] scroll-smooth focus:scroll-auto">
          {tasks.map((item, i) =>
            !item.edit ? (
              <li
                key={i}
                className="h-10 w-f hover:text-white hover:bg-slate-700 my-1 py-2 px-3 rounded cursor-pointer"
                onClick={() => setTaskFormActive(true)}
              >
                {item.title.substring(1 + item.title.indexOf(":"))}
              </li>
            ) : (
              <section className="flex flex-row px-2 my-1 py-2">
                <input
                  className="w-full outline-none px-2"
                  onChange={(e) => (item.title = e.target.value)}
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-checkbox text-cyan-700"
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
