import { useState } from "react";
import { useStore } from "@nanostores/react";
import { istToastActive, closeToast, toastMessage } from "../store/toast.store";

export default () => {
  const $toastMessage = useStore(toastMessage);
  return (
    <section
      className={`
      absolute top-4 right-4 bg-slate-900 rounded flex flex-row
      justify-between items-start w-64 h-20 p-2
      ${istToastActive() ? "" : "hidden"}
      `}
    >
      <p className="text-red-400 h-full">
        {$toastMessage.length > 30
          ? `${$toastMessage.substring(0, 30)}...`
          : $toastMessage}
      </p>
      <span onClick={closeToast}>
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
          className="icon icon-tabler icons-tabler-outline icon-tabler-x text-white cursor-pointer"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </span>
    </section>
  );
};
