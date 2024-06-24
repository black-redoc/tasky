import React from "react";
import { describe, it, afterEach } from "vitest";
import { cleanup, render, } from "@testing-library/react";
import Home from "../page";
import { StateProvider } from "../../providers/state_provider";


describe("Home page", () => {
  afterEach(cleanup);
  it("should render the page", () => {
    render(
      <StateProvider >
        <Home />
      </StateProvider>
    );
  });
});