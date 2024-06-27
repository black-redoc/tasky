import React, { useContext } from "react";
import { render, screen, cleanup, act } from "@testing-library/react";
import { StateProvider } from "../state_provider";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { DispatchContext, StateContext } from "../../contexts/states";

function TestComponent() {
  const { toastState } = useContext(StateContext);
  const { toastDispatch } = useContext(DispatchContext);
  return (
    <>
      <h1 data-testid="message">{toastState.message}</h1>
      <button
        onClick={() =>
          toastDispatch({
            type: "ON_MESSAGE",
            payload: { message: "Test app", isError: false },
          })
        }
      >
        Button
      </button>
    </>
  );
}

describe("StateProvider", () => {
  afterEach(cleanup);
  beforeEach(() => {
    render(
      <StateProvider>
        <TestComponent />
      </StateProvider>
    );
  });
  it("should get the message from the state", () => {
    const expected_result = "Test app";
    act(() => screen.getByText("Button").click());
    const result = screen.getByTestId("message").innerText;
    expect(result).toEqual(expected_result);
  });
});
