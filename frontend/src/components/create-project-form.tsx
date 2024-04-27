import {
  isCreateProjectActive,
  setIsCreateProjectActive,
} from "../store/project.store";
import { useStore } from "@nanostores/react";
import Button from "../components/button";
import { createProject } from "../services/projects.service";
import { useState } from "react";
import { setToastMessage } from "../store/toast.store";
import Toast from "../components/toast";

export default () => {
  const $isCreateProjectActive = useStore(isCreateProjectActive);
  const [project, setProject] = useState({} as any);
  const onSave = async (e: any) => {
    e.preventDefault();
    const response = await createProject({
      title: project.title,
      description: project.description,
    });

    if (typeof response === "string") {
      setToastMessage({ message: "Error while creating project" });
      return;
    }
    setToastMessage({ message: "Project created successfully!" });
    setIsCreateProjectActive({ isCreatingProject: false });
  };
  const onCancel = (e: any) => {
    e.preventDefault();
    setIsCreateProjectActive({ isCreatingProject: false });
  };

  const onChangeProject = (projectValue: any) => {
    setProject((state: any) => ({ ...state, ...projectValue }));
  };

  return (
    <>
      <Toast />
      {$isCreateProjectActive ? (
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
                    onChange={(event) =>
                      onChangeProject({ title: event.target.value })
                    }
                  />
                </div>
                <div className="mt-3">
                  <p className="font-medium">Project description</p>
                  <textarea
                    rows={4}
                    name="description"
                    className="w-full text-gray-600 font-normal focus:ring-cyan-600 ring-inset rounded-md block border-0 ring-1 focus:ring-2 focus:ring-inset leading-6 focus:border-none appearance-none outline-none px-2 py-1 mt-2"
                    onChange={(event) =>
                      onChangeProject({ description: event.target.value })
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
                content="Save"
                fontSize="text-base"
                textColor="text-slate-500"
                fontWeight="font-normal"
                onClick={onSave}
              >
                Save
              </Button>
              <Button
                onClick={onCancel}
                primaryColor={true}
                width="w-32"
                content="Save"
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
