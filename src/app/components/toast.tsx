"use client";
import { DispatchContext, StateContext } from "../contexts/states";
import { ToastType } from "../reducers/toast.reducer";
import CircularProgressBar from "./circular-progress";
import { useEffect, useContext } from "react";

export default function Toast() {
  const { toastState } = useContext(StateContext);
  const { toastDispatch } = useContext(DispatchContext);
  useEffect(() => {
    if (!toastState.message) {
      return;
    }
    const setTimeoutId = setTimeout(() => {
      toastDispatch({ type: "CLOSE_TOAST", payload: {} as ToastType });
      clearTimeout(setTimeoutId);
    }, 2000);
  }, [toastState]);
  return (
    <section
      className={`
      absolute top-4 right-0 mx-2 bg-slate-900 rounded-md flex flex-row
      justify-between w-80 h-12 p-2 items-center fade-out
      ${toastState.message.length > 0 ? "" : "hidden"}
      `}
    >
      <p
        className={`${
          toastState.isError ? "text-red-400" : "text-cyan-400"
        } h-full flex flex-col items-center justify-center`}
      >
        {(toastState.message.length ?? 0) > 30
          ? `${toastState.message!.substring(0, 30)}...`
          : toastState.message}
      </p>
      <span
        onClick={() =>
          toastDispatch({ type: "CLOSE_TOAST", payload: {} as ToastType })
        }
      >
        <CircularProgressBar>
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
        </CircularProgressBar>
      </span>
    </section>
  );
}
