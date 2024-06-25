import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from "../card";
import { StateProvider } from "../../providers/state_provider";

describe("Catd", () => {
  it("render wirthout crashing", () => {
    render(
      <StateProvider>
        <Card title="Title" description="Description" id={1} />
      </StateProvider>
    );
  });

  it("render with description length > 80", () => {
    const description = "a".repeat(81);
    render(
      <StateProvider>
        <Card title="Title" description={description} id={1} />
      </StateProvider>
    );
  });

  it("render without description", () => {
    const description = undefined;
    const { container } = render(
      <StateProvider>
        <Card title="Title" description={description} id={1} />
      </StateProvider>
    );
    expect(container).toBeTruthy();
  });

  it("render clicking on edit button", () => {
    const description = undefined;
    const { container } = render(
      <StateProvider>
        <Card title="Title" description={description} id={1} />
      </StateProvider>
    );
    fireEvent.click(screen.getByRole("edit"));
    expect(container).toBeTruthy();
  });

  it("render clicking on show more button", () => {
    const description = undefined;
    const { container } = render(
      <StateProvider>
        <Card title="Title" description={description} id={1} />
      </StateProvider>
    );
    fireEvent.click(screen.getByRole("show-more"));
    expect(container).toBeTruthy();
  });
});
