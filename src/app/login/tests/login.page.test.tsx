import React from "react";
import { describe, it, afterEach } from "vitest";
import { cleanup, render, } from "@testing-library/react";
import Login from "../page";
import { StateProvider } from "../../providers/state_provider";


describe("Login page", () => {
  afterEach(cleanup);
  it("should render the page", () => {
    render(
      <StateProvider >
        <Login />
      </StateProvider>
    );
  });
});