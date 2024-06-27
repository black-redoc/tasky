import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BoardColumn from "../board-column";
import { StateProvider } from "../../providers/state_provider";

describe("BoardColumn", () => {
  it("renders", () => {
    render(
      <StateProvider>
        <BoardColumn boardName="todo" project_id={1} />
      </StateProvider>
    );
  });
});
