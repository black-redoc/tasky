"use client";
import React, { useContext, useEffect, useState } from "react";
import ProjectForm from "./components/project-form";
import Projects from "./components/projects";
import { useRouter } from "next/navigation";
import { DispatchContext, StateContext } from "./contexts/states";
const IS_PREVIEW = process.env.NEXT_PUBLIC_IS_PREVIEW;

function Index() {
  const router = useRouter();
  const { authDispatch } = useContext(DispatchContext);
  const { tryItState, isLoadingState } = useContext(StateContext);
  const [isLoading, setIsloading] = useState(true)
  // const guardRoute = async () => {
  //   return await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/protected/`,
  //     {
  //       method: "GET",
  //       credentials: "include",
  //       // redirect: "follow"
  //     }
  //   ).then(async (response) => {
  //     return [response.status, await response.json()]
  //   })
  //   .catch(error => error)
  // }
  // useEffect(() => {
  //   if (IS_PREVIEW) {
  //     setIsloading(false)
  //     return
  //   }
  //   if (tryItState.enable_tryit) {
  //     setIsloading(false)
  //     return
  //   }
  //   (async () => {
  //     const [status, data] = await guardRoute();
  //     setIsloading(false)
  //     if (status === 200) {
  //       authDispatch({ type: "LOGIN", payload: data });
  //       return
  //     }
  //     router.push("/home");
  //   })()
  // }, []);
  if (isLoadingState.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ProjectForm />
      <main className="flex w-full justify-center items-center">
        <div
          className={`flex gap-4 flex-wrap justify-start items-center w-[67rem]`}
        >
          <Projects />
        </div>
      </main>
    </>
  );
}

export default Index;