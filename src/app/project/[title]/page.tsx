"use client";
import Board from "@/app/components/board";
import Toast from "@/app/components/toast";
import { StateContext } from "@/app/contexts/states";
import { TaskStateType } from "@/app/reducers/tasks.reducer";
import { getProjectByTitle } from "@/app/repositories/projects.repository";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ProjectTitle({ params }: { params: any }) {
  const { authState, projectState } = useContext(StateContext);
  const [board, setBoard] = useState({} as TaskStateType);
  const router = useRouter();
  const [projectId, setProjectId] = useState(0);
  useEffect(() => {
    // Load project
    const loadProject = async () => {
      const { title } = params;
      const projectByTitle = await getProjectByTitle({ title, projectState });
      if (!projectByTitle) {
        router.push("/not-found");
        return;
      }
      const [tasksBoard, project_id] = projectByTitle;
      setProjectId(project_id);
      setBoard(tasksBoard);
    };
    loadProject();
  }, []);

  useEffect(() => {
    // Protected route
    if (!Boolean(authState.user.email) && !Boolean(authState.user.username)) {
      router.push("/home");
      return;
    }
  }, []);

  return (
    <>
      <Toast />
      <main className="justify-center items-center w-full flex">
        <Board boards={board} project_id={projectId} />
      </main>
    </>
  );
}
