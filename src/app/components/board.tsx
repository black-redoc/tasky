import { DispatchContext, StateContext } from "../contexts/states";
import { TaskStateType } from "../reducers/tasks.reducer";
import { capitalize } from "../services/strings.service";
import BoardColumn from "./board-column";
import { useContext, useEffect } from "react";

export default function Board({
  boards,
  project_id,
}: {
  boards?: TaskStateType;
  project_id: number;
}) {
  const { taskState } = useContext(StateContext);
  const { taskDispatch } = useContext(DispatchContext);
  useEffect(() => {
    // Load tasks by status
    taskDispatch({
      type: "ADD_ALL_TASKS",
      payload: {
        tasks: boards!,
        task: {} as any,
      },
    });
  }, [boards]);
  useEffect(() => {
    // Load selected project id
    taskDispatch({
      type: "SET_PROJECT_ID",
      payload: {
        project_id,
        task: {} as any,
      },
    });
  }, [boards]);

  return (
    <>
      <article className="flex flex-row gap-4 overflow-x-auto scroll-smooth py-2 items-start max-h-[36rem]">
        {Object.keys(taskState.tasks ?? {})
          .map((status) => ({
            status,
            project_id,
          }))
          .map(({ status, project_id }, id) => {
            return (
              <BoardColumn
                key={id}
                boardName={`${capitalize({ word: status })}`}
                project_id={project_id}
              />
            );
          })}
      </article>
    </>
  );
}
