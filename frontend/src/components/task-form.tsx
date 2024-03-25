import Button from "./button";
export default ({ setTaskFormActive }: { setTaskFormActive: any }) => {
  return (
    <article className="absolute top-0 left-0 bottom-0 right-0 bg-slate-800/80 flex items-center justify-center">
      <section className="h-[35rem] w-[20rem] bg-sky-100 mx-auto rounded py-3 px-4">
        <div className="flex flex-row justify-between w-full">
          <h1>title</h1>
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
        <div className="flex flex-col gap-5 my-4">
          <select
            className="py-2 px-2 outline-none focus:ring-cyan-600 ring-inset rounded-md block ring-1 focus:ring-2 focus:ring-inset focus:border-none appearance-none border-gray-800 shadow leading-tight focus:outline-none focus:shadow-outline"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"), none`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem'
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
        </div>
      </section>
    </article>
  );
};
