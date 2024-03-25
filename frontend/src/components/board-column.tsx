import { useState } from "react";
import Button from "./button";

export default ({
  items,
  boardName,
}: {
  items: string[];
  boardName: string;
}) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <ul className="min-w-64 h-f bg-slate-200 rounded-xl pb-5">
      <h1 className="px-3 py-2 text-white font-bold bg-cyan-700 rounded-t flex flex-row justify-between">
        {editMode ? (
          <input
            className="w-52 text-gray-600 font-normal focus:ring-indigo-600 ring-inset rounded-md block border-0 ring-1 focus:ring-2 focus:ring-inset leading-6 focus:border-none appearance-none outline-none px-2"
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
      <section className="hover:overflow-y-auto overflow-y-hidden max-h-[30rem] scroll-smooth focus:scroll-auto">
        {items.map((item, i) => (
          <li
            key={i}
            className="h-10 w-f hover:text-white hover:bg-slate-700 my-1 py-2 px-3 rounded cursor-pointer"
          >
            {item}
          </li>
        ))}
        <li className="flex justify-center items-center">
        <Button>
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
  );
};
