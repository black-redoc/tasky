import { render } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import Index from "../page";
import { StateProvider } from "../providers/state_provider";

describe("Index page", () => {
  it("renders", () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => "success", status: 200 })
    ) as Mock;
    render(
      <StateProvider>
        <Index />
      </StateProvider>
    );
  });
});
