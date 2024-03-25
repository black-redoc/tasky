import { useState } from "react";
import Button from "./button";

export default ({ setTaskFormActive }: { setTaskFormActive: any }) => {
  const [editTitleMode, setEditTitleMode] = useState(false);

  const saveForm = () => {
    setTaskFormActive(false);
  };
  return (
    <article className="absolute top-0 left-0 bottom-0 right-0 bg-slate-800/80 flex items-center justify-center">
      <section className="h-[35rem] w-[20rem] bg-sky-100 mx-auto rounded py-3 px-4">
        <div className="flex flex-row justify-end w-full">
          <span
            onClick={() => setTaskFormActive(false)}
            className="cursor-pointer"
          >
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-x"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </span>
        </div>
        <div className="mt-5 flex flex-row justify-between w-full">
          {editTitleMode ? (
            <input className="w-full text-gray-600 font-normal focus:ring-cyan-600 ring-inset rounded-md block border-0 ring-1 focus:ring-2 focus:ring-inset leading-6 focus:border-none appearance-none outline-none px-2" />
          ) : (
            <h1>title</h1>
          )}
          {!editTitleMode ? (
            <span
              onClick={() => setEditTitleMode(!editTitleMode)}
              className="cursor-pointer"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </span>
          ) : (
            <span
              onClick={() => setEditTitleMode(!editTitleMode)}
              className="cursor-pointer"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-checkbox"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 11l3 3l8 -8" />
                <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
              </svg>
            </span>
          )}
        </div>
        <div className="flex flex-col gap-5 my-4">
          <select
            className="py-2 px-2 outline-none focus:ring-cyan-600 ring-inset rounded-md block ring-1 focus:ring-2 focus:ring-inset focus:border-none appearance-none border-gray-800 shadow leading-tight focus:outline-none focus:shadow-outline"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"), none`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
          >
            <option value="TODO">TODO</option>
            <option value="Doing">Doing</option>
            <option value="Blocked">Blocked</option>
            <option value="Done">Done</option>
          </select>
          <textarea
            className="outline-none py-1 px-2 h-64 rounded"
            placeholder="Comments..."
          ></textarea>
          <Button
            primaryColor={true}
            width="w-32"
            content="Save"
            fontSize="text-base"
            textColor="text-white"
            fontWeight="font-normal"
            onClick={saveForm}
          />
        </div>
      </section>
    </article>
  );
};
