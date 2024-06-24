import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Link from "../link";

describe("Link", () => {
  it("renders a link", () => {
    const { getByText } = render(
      <Link href="https://example.com" content="Example" />
    );
    expect(getByText("Example")).toBeDefined();
  });
});
