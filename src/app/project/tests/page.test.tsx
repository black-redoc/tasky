import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ProjectTitle from "../[title]/page";
import { StateProvider } from "../../providers/state_provider";


describe("Page", () => {
  afterEach(cleanup);
  it("should render the page", () => {
    render(
      <StateProvider >
        <ProjectTitle params={{ title: "Project" }} />
      </StateProvider>
    );
  });
});
