// import Image from "next/image";
"use client";
import React, { useContext, useEffect, memo, useRef } from "react";
import ProjectForm from "./components/project-form";
import Projects from "./components/projects";
import { useRouter } from "next/navigation";
import { StateContext } from "./contexts/states";

function Index() {
  const router = useRouter();
  const { authState } = useContext(StateContext);
  useEffect(() => {
    if (Boolean(authState.user.email) || Boolean(authState.user.username)) {
      return;
    }
    router.push("/home");
  }, []);
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
