import { capitalize } from "../services/strings.service";
import BoardColumn from "./board-column";
import Button from "./button";
import { useEffect } from "react";
import { type Board } from "../types/board.types";

import { useStore } from "@nanostores/react";
import {
  boardStore,
  initialBoardStore,
  setProjectId,
} from "../store/board.store";

export default ({
  boards,
  projectId,
}: {
  boards?: Board;
  projectId: number;
}) => {
  const $boardStore = useStore(boardStore);
  useEffect(() => {
    initialBoardStore({
      boards: boards,
    });
    setProjectId({ projectId });
  }, []);

  return (
    <>
      <article className="flex flex-row gap-4 overflow-x-auto scroll-smooth py-2 items-start max-h-[36rem]">
        {Object.keys($boardStore as any)
          .map((status: any) => ({
            status,
            tasks: (($boardStore as any)[status] ?? []).map(
              ({
                title,
                description,
                id,
              }: {
                title: string;
                description?: string;
                id: number;
              }) => ({ title, description, id, status })
            ),
            projectId,
          }))
          .map(({ status, tasks, projectId }, id) => {
            return (
              <BoardColumn
                key={id}
                boardName={`${capitalize({ word: status })}`}
                projectId={projectId}
              />
            );
          })}

        <section className="flex flex-col justify-center items-center size-12 my-auto">
          <Button textColor="text-cyan-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
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
        </section>
      </article>
    </>
  );
};
