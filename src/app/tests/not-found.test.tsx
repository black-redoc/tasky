import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page404NotFound from "../not-found";

describe("NotFound", () => {
  it("renders", () => {
    render(<Page404NotFound />);
  });
});
