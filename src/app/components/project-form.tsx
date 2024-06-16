"use client";
import Button from "./button";
import { useContext, useEffect, useState } from "react";
import {
  createProject,
  updateProject as updateProjectRepository,
} from "../repositories/projects.repository";
import { DispatchContext, StateContext } from "../contexts/states";
import { ProjectType } from "../reducers/projects.reducer";
import Toast from "./toast";

export default function ProjectForm() {
  const { authState, projectFormState, editingProjectState } =
    useContext(StateContext);
  const {
    projectFormDispatch,
    projectDispatch,
    toastDispatch,
    editingProjectDispatch,
  } = useContext(DispatchContext);
  const [project, setProject] = useState({} as ProjectType);
  useEffect(() => {
    setProject({ ...editingProjectState.project });
  }, [editingProjectState]);

  const updateProject = async () => {
    projectFormDispatch({ type: "CLOSE_FORM" });

    const message = await updateProjectRepository({
      isAuth: authState.user.email ? true : false,
      project: project,
      projectDispatch,
    });
    toastDispatch({
      type: "ON_MESSAGE",
      payload: { message: message.message, isError: message.isError ?? false },
    });
  };
  const saveProject = async () => {
    projectFormDispatch({ type: "CLOSE_FORM" });
    const message = await createProject({
      isAuth: authState.user.email ? true : false,
      project: {
        title: project.title,
        description: project.description,
      } as ProjectType,
      projectDispatch,
    });
    toastDispatch({
      type: "ON_MESSAGE",
      payload: { message: message.message, isError: message.isError ?? false },
    });
  };

  const onSave = async (event: any) => {
    event.preventDefault();
    if (Object.values(editingProjectState.project).length) {
      await updateProject();
      return;
    }
    await saveProject();
  };

  const onCancel = (event: any) => {
    event.preventDefault();
    projectFormDispatch({ type: "CLOSE_FORM" });
    editingProjectDispatch({
      type: "UNSET_EDITING_PROJECT",
      payload: { project: {} as ProjectType },
    });
  };

  const onChangeProject = (projectValue: ProjectType) => {
    setProject((state: ProjectType) => ({ ...state, ...projectValue }));
  };

  const submitMessage = () => {
    return Object.values(editingProjectState.project).length
      ? "Update"
      : "Save";
  };

  return (
    <>
      <Toast />
      {projectFormState.isOpen ? (
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
                    autoFocus
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
}
