import { capitalize } from "../services/strings.service";
import BoardColumn from "./board-column";
import Button from "./button";

export default ({ boards, projectId }: { boards: any; projectId: number }) => {
  const getBoards = () => {
    return ["todo", "doing", "blocked", "done"]
      .map((status) => ({
        status,
        tasks: (boards[status] ?? []).map(
          ({ title }: { title: string }) => title
        ),
        projectId,
      }))
      .map(({ status, tasks, projectId }) => (
        <BoardColumn
          boardName={`${capitalize({ word: status })}`}
          projectId={projectId}
          items={tasks}
        />
      ));
  };
  return (
    <article className="flex flex-row gap-4 overflow-x-auto scroll-smooth py-2 items-start max-h-[36rem]">
      {getBoards()}
      <section className="flex flex-col justify-center items-center size-12 my-auto">
        <Button textColor="text-cyan-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
      </section>
    </article>
  );
};
