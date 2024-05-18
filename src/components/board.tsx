import { capitalize } from "../services/strings.service";
import BoardColumn from "./board-column";
import { useEffect } from "react";

import { useStore } from "@nanostores/react";
import {
  boardStore,
  initialBoardStore,
  setProjectId,
  type BoardStoreType,
} from "../store/board.store";

export default ({
  boards,
  projectId,
}: {
  boards?: BoardStoreType;
  projectId: number;
}) => {
  const $boardStore = useStore(boardStore);
  useEffect(() => {
    initialBoardStore({
      boards: boards!,
    });
    setProjectId({ projectId });
  }, []);

  return (
    <>
      <article className="flex flex-row gap-4 overflow-x-auto scroll-smooth py-2 items-start max-h-[36rem]">
        {Object.keys($boardStore)
          .map((status) => ({
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
