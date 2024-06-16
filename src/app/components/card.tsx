import Link from "./link";
import DeleteProjectBtn from "./delete-project-btn";
import ProjectForm from "./project-form";
import { DispatchContext } from "../contexts/states";
import { useContext } from "react";
import { ProjectType } from "../reducers/projects.reducer";
import { useRouter } from "next/navigation";

export default function Card({
  title,
  description,
  id,
}: {
  title: string;
  description: string | undefined;
  id?: number | string;
}) {
  const router = useRouter();
  const { projectFormDispatch, editingProjectDispatch } =
    useContext(DispatchContext);
  const openEditProjectForm = () => {
    projectFormDispatch({ type: "OPEN_FORM" });
    editingProjectDispatch({
      type: "SET_EDITING_PROJECT",
      payload: { project: { title, description, id } as ProjectType },
    });
  };
  const redirectToProjectByTitle = () => {
    router.push(`/project/${title}`);
  };
  return (
    <>
      <ProjectForm />
      <div
        className={`
        rounded w-60 h-52 flex flex-col bg-sky-50
        `}
      >
        <h1
          className={`
        rounded-t w-full bg-sky-800 text-white font-bold
        flex items-center px-2 py-1 flex-row justify-between
        `}
        >
          <p>{title}</p>
          <aside id="deleteBtn" className="text-black font-normal">
            <DeleteProjectBtn id={id} title={title} />
          </aside>
        </h1>
        <div className="flex flex-col justify-between h-full">
          {description ? (
            <p className="text-gray-600 px-2 py-1">
              {description.length > 80
                ? `${description.substring(0, 80)}...`
                : description}
            </p>
          ) : (
            ""
          )}

          <aside className="flex flex-col w-full mb-2">
            <Link onClick={redirectToProjectByTitle} content="Show more" />
            <Link
              className="bg-cyan-600"
              isSecondary
              content="Edit"
              onClick={openEditProjectForm}
            />
          </aside>
        </div>
      </div>
    </>
  );
}
