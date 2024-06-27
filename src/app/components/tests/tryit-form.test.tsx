import { describe, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import TryItForm from "../tryit-form";

describe("TryItForm", () => {
  it("renders", () => {
    render(<TryItForm />);
  });

  it("renders and submits", () => {
    render(<TryItForm />);
    fireEvent.input(screen.getByTestId("input-username"), {
      target: {
        value: "test-username",
      },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
  });

  it("renders and submits with empty username", () => {
    render(<TryItForm />);
    fireEvent.input(screen.getByTestId("input-username"), {
      target: {
        value: "",
      },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
  });

  it("renders and submits with username less than 3 characters", () => {
    render(<TryItForm />);
    fireEvent.input(screen.getByTestId("input-username"), {
      target: {
        value: "ts",
      },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
  });
});
