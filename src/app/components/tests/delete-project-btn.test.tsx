import React, { Dispatch } from "react";
import { afterEach, describe, it, MockInstance, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import DeleteProjectBtn from "../delete-project-btn";
import { StateProvider } from "../../providers/state_provider";

describe("DeleteProject", () => {
  let useStateSpy: MockInstance<[], [unknown, Dispatch<unknown>]>;
  let isDeleting: boolean;
  let setIsDeleting: Dispatch<unknown>;
  it("click on delete button", () => {
    const id = "1";
    const title = "Title";
    const result = render(
      <StateProvider>
        <DeleteProjectBtn id={id} title={title} />
      </StateProvider>
    );
    const svg = screen.getByRole("button");
    fireEvent.click(svg);
  });

  it("click on delete button with undefined id", () => {
    const id = undefined;
    const title = "Title";
    render(
      <StateProvider>
        <DeleteProjectBtn id={id} title={title} />
      </StateProvider>
    );
    const svg = screen.getByRole("button");
    fireEvent.click(svg);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
