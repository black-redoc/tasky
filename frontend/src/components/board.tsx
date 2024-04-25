import { capitalize } from "../services/strings.service";
import BoardColumn from "./board-column";
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
            projectId,
          }))
          .map(({ status, projectId }, id) => {
            return (
              <BoardColumn
                key={id}
                boardName={`${capitalize({ word: status })}`}
                projectId={projectId}
              />
            );
          })}
      </article>
    </>
  );
};
