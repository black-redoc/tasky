import { useState } from "react";

export default ({ message }: { message: string }) => {
  const [show, setShow] = useState(true);
  return (
    <section
      className={`
      absolute top-4 right-4 bg-slate-900 rounded flex flex-row
      justify-between items-start w-64 h-20 p-2
      ${!show ? "hidden" : ""}
      `}
    >
      <p className="text-red-400 h-full">
        {message.length > 30 ? `${message.substring(0, 30)}...` : message}
      </p>
      <span
        onClick={() => {
          setShow(false);
        }}
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
