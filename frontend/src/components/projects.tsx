import Card from "./card";
import { getProjects } from "../services/projects.service";
import { type Project } from "../types/projects";
import { setToastMessage } from "../store/toast.store";
import { updateProjectsStore, projectsStore } from "../store/project.store";
import { useEffect } from "react";
import { useStore } from "@nanostores/react";

export default () => {
  const $projects = useStore(projectsStore);
  useEffect(() => {
    getProjects().then((projects: Project[] | string) => {
      if (typeof projects == "string") {
        setToastMessage({ message: projects, isError: true });
      } else {
        updateProjectsStore({ projects });
      }
    });
  }, []);

  return (
    <>
      {Object.values($projects).length ? (
        Object.values($projects).map(
          ({ title, description, id }: any, idx: number) => (
            <Card title={title} description={description} id={id} key={idx} />
          )
        )
      ) : (
        <></>
      )}
    </>
  );
};
