import Card from "./card";
// import { getProjects } from "../services/projects.service";
import { setToastMessage } from "../store/toast.store";
import {
  projectsStore,
  type ProjectType,
} from "../store/project.store";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { getProjects } from "../repositories/projects.repository";
import { isLoggedIn } from "../store/auth.store";

export default () => {
  const $projects = useStore(projectsStore);
  useEffect(() => {
    getProjects({isAuth: isLoggedIn()}).then((error) => {
      if (error) {
        setToastMessage(error)
      }
    })
  }, []);

  const [isMobile, setIsMobile] = useState(
    navigator.userAgent.toLowerCase().includes("mobile")
  );

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(navigator.userAgent.toLowerCase().includes("mobile"));
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <main
        className={`flex items-center gap-5 flex-wrap
          ${isMobile ? "justify-center" : "justify-start"}
          `}
      >
        {Object.values($projects).length ? (
          Object.values($projects).map(
            ({ title, description, id }: ProjectType, idx: number) => (
              <Card title={title} description={description} id={id} key={idx} />
            )
          )
        ) : (
          <></>
        )}
      </main>
    </>
  );
};
