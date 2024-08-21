"use client";
import Card from "./card";
import { useContext, useEffect, useState } from "react";
import { getProjects } from "../repositories/projects.repository";
import { DispatchContext, StateContext } from "../contexts/states";
import { ProjectType } from "../reducers/projects.reducer";
import { useRouter } from "next/navigation";

export default function Projects() {
  const { toastDispatch, projectDispatch, isLoadingDispatch } = useContext(DispatchContext);
  const { authState, projectState } = useContext(StateContext);
  const router = useRouter();
  useEffect(() => {
    getProjects({
      isAuth: authState.user.email ? true : false,
      projectDispatch,
      isLoadingDispatch
    }).then((error) => {
      if (error) {
        if (error.message.includes("Unauthorized")) {
          router.push("/login");
        }
        toastDispatch({
          type: "ON_MESSASGE",
          payload: { ...error },
        });
      }
    });
  }, []);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof navigator !== "undefined") {
      return navigator.userAgent.toLowerCase().includes("mobile");
    }
    return false;
  });

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
        {Object.values(projectState.projects).length ? (
          Object.values(projectState.projects).map(
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
}
