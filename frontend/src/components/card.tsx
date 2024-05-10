import Link from "./link";
import DeleteProjectBtn from "./delete-project-btn";
import {
  setIsProjectFormActive,
  setEditingProjectStore,
  type ProjectType,
} from "../store/project.store";
import ProjectForm from "./project-form";

export default ({
  title,
  description,
  id,
}: {
  title: string;
  description: string | undefined;
  id?: number;
}) => {
  const openEditProjectForm = () => {
    setIsProjectFormActive({ projectFormActive: true });
    setEditingProjectStore({
      project: { title, description, id } as ProjectType,
    });
  };
  return (
    <>
      <ProjectForm />
      <div className="rounded w-60 h-52 flex flex-col bg-sky-50">
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
            <Link content="Show more" href={`/project/${title}`} />
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
};
