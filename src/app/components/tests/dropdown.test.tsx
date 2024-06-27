import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Dropdown from "../dropdown";
import { StateProvider } from "../../providers/state_provider";

describe("Dropdown", () => {
  it("renders a dropdown", () => {
    render(
      <StateProvider>
        <Dropdown />
      </StateProvider>
    );
    // expect(screen.getByText("Index")).toBeDefined();
  });
});
