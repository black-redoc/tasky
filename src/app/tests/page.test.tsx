import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Index from "../page";
import { StateProvider } from "../providers/state_provider";

describe("Index page", () => {
  it("renders", () => {
    render(
      <StateProvider>
        <Index />
      </StateProvider>
    );
  });
});
