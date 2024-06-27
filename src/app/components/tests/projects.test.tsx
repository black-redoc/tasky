import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Projects from "../projects";
import { StateProvider } from "../../providers/state_provider";

describe("Projects Compoonent", () => {
  it("renders without crashing", () => {
    render(
      <StateProvider>
        <Projects />
      </StateProvider>
    );
  });
});
