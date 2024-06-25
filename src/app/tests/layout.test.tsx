import React from 'react';
import { describe, it, expect } from "vitest";
import RootLayout from "../layout";
import { render } from "@testing-library/react";
import { StateProvider } from "../providers/state_provider";
describe("Layout", () => {
  it("renders", () => {
    render(
      <StateProvider>
        <RootLayout>
          <h1>Test layout</h1>
        </RootLayout>
      </StateProvider>
    );
  });
});
