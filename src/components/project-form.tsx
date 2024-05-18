import {
  isProjectFormActive,
  setIsProjectFormActive,
  editingProjectStore,
  updateProjectsStore,
  setEditingProjectStore,
  type ProjectType,
} from "../store/project.store";
import { useStore } from "@nanostores/react";
import Button from "./button";
import {
  createProject,
  updateProject as updateProjectService,
} from "../services/projects.service";
import { useEffect, useState } from "react";
import { setToastMessage } from "../store/toast.store";
import Toast from "./toast";

export default () => {
  const $editingProjectStore = useStore(editingProjectStore);
  const $isProjectFormActive = useStore(isProjectFormActive);
  const [project, setProject] = useState({} as ProjectType);
  useEffect(() => {
    setProject({ ...$editingProjectStore });
  }, [$editingProjectStore]);

  const updateProject = async () => {
    const response = await updateProjectService({ ...project });
    if (typeof response == "string") {
      setToastMessage({ message: response, isError: true });
      return;
    }

    setIsProjectFormActive({ projectFormActive: false });
    updateProjectsStore({ projects: [project] });
    setToastMessage({
      message: `Updated project ${project.title} successfully!`,
    });
  };
  const saveProject = async () => {
    const response = await createProject({
      title: project.title,
      description: project.description,
    });

    if (typeof response === "string") {
      setToastMessage({
        message: "Error while creating project",
        isError: true,
      });
      return;
    }
    updateProjectsStore({ projects: [response] });
    setToastMessage({ message: "Project created successfully!" });
    setIsProjectFormActive({ projectFormActive: false });
  };
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSave = async (e: any) => {
    e.preventDefault();
    if (Object.values($editingProjectStore).length) {
      await updateProject();
      return;
    }

    await saveProject();
  };
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onCancel = (e: any) => {
    e.preventDefault();
    setIsProjectFormActive({ projectFormActive: false });
    setEditingProjectStore({ project: {} as ProjectType });
  };

  const onChangeProject = (projectValue: ProjectType) => {
    setProject((state: ProjectType) => ({ ...state, ...projectValue }));
  };

  const submitMessage = () => {
    return Object.values($editingProjectStore).length ? "Update" : "Save";
  };

  return (
    <>
      <Toast />
      {$isProjectFormActive ? (
        <section
          className={`
        absolute top-0 left-0 right-0 bottom-0 bg-slate-900/90 w-full
        h-full flex justify-center items-center
        `}
        >
          <form className="w-80 h-[22rem] bg-slate-50 rounded flex flex-col items-start justify-between pb-">
            <article className="w-full">
              <h1 className="rounded-t w-full h-10 bg-cyan-600 text-white flex items-center pl-4 text-xl">
                Create new project
              </h1>
              <aside className="px-4 w-full mt-6">
                <div>
                  <p className="font-medium">Project name</p>
                  <input
                    type="text"
                    name="title"
                    className="w-full text-gray-600 font-normal focus:ring-cyan-600 ring-inset rounded-md block border-0 ring-1 focus:ring-2 focus:ring-inset leading-6 focus:border-none appearance-none outline-none px-2 py-1 mt-2"
                    defaultValue={project.title}
                    onChange={(event) =>
                      onChangeProject({
                        title: event.target.value,
                      } as ProjectType)
                    }
                  />
                </div>
                <div className="mt-3">
                  <p className="font-medium">Project description</p>
                  <textarea
                    defaultValue={project.description}
                    rows={4}
                    name="description"
                    className="w-full text-gray-600 font-normal focus:ring-cyan-600 ring-inset rounded-md block border-0 ring-1 focus:ring-2 focus:ring-inset leading-6 focus:border-none appearance-none outline-none px-2 py-1 mt-2"
                    onChange={(event) =>
                      onChangeProject({
                        description: event.target.value,
                      } as ProjectType)
                    }
                  />
                </div>
              </aside>
            </article>
            <aside className="flex flex-row gap-4 justify-center items-center w-full mb-4">
              <Button
                primaryColor={false}
                borderActive={true}
                width="w-32"
                content={submitMessage()}
                fontSize="text-base"
                textColor="text-cyan-700"
                fontWeight="font-medium"
                onClick={onSave}
              >
                {submitMessage()}
              </Button>
              <Button
                onClick={onCancel}
                primaryColor={true}
                width="w-32"
                content="Cancel"
                fontSize="text-base"
                textColor="text-white"
                fontWeight="font-normal"
              >
                Cancel
              </Button>
            </aside>
          </form>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};
