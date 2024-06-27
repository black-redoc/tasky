import React from "react";
import { describe, it, afterEach } from "vitest";
import { cleanup, render, } from "@testing-library/react";
import ProjectTitle from "../[title]/page";
import { StateProvider } from "../../providers/state_provider";


describe("Project [title] page", () => {
  afterEach(cleanup);
  it("should render the page", () => {
    render(
      <StateProvider >
        <ProjectTitle params={{ title: "Project" }} />
      </StateProvider>
    );
  });
});
