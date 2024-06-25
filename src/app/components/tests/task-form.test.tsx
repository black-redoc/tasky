import { describe, it, expect, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import TaskForm from "../task-form";
import { StateProvider } from "../../providers/state_provider";
import { TaskType } from "../../reducers/tasks.reducer";

describe("TaskForm", () => {
  it("renders", () => {
    const mockSetCurrentTask = vi.fn();
    const mockSetTaskFormActive = vi.fn();
    const mockTask = {
      title: "id:Task Form",
      status: "todo",
    } as TaskType;
    render(
      <StateProvider>
        <TaskForm
          setTaskFormActive={mockSetTaskFormActive}
          task={mockTask}
          setCurrentTask={mockSetCurrentTask}
        />
      </StateProvider>
    );
    expect(screen.getByText("Task Form")).toBeDefined();
  });

  it("renders and click on setTaskFormActive", () => {
    const mockSetCurrentTask = vi.fn();
    const mockSetTaskFormActive = vi.fn();
    const mockTask = {
      title: "id:Task Form",
      status: "todo",
    } as TaskType;
    render(
      <StateProvider>
        <TaskForm
          setTaskFormActive={mockSetTaskFormActive}
          task={mockTask}
          setCurrentTask={mockSetCurrentTask}
        />
      </StateProvider>
    );
    act(() => fireEvent.click(screen.getByTestId("set-task-form-active")));
  });

  it("renders and click on setEditTitleMode", () => {
    const mockSetCurrentTask = vi.fn();
    const mockSetTaskFormActive = vi.fn();
    const mockTask = {
      title: "id:Task Form",
      status: "todo",
    } as TaskType;
    render(
      <StateProvider>
        <TaskForm
          setTaskFormActive={mockSetTaskFormActive}
          task={mockTask}
          setCurrentTask={mockSetCurrentTask}
        />
      </StateProvider>
    );
    fireEvent.click(screen.getByTestId("set-edit-title-mode"));
  });

  it("renders and click on saveForm span", () => {
    const mockSetCurrentTask = vi.fn();
    const mockSetTaskFormActive = vi.fn();
    const mockTask = {
      title: "id:Task Form",
      status: "todo",
    } as TaskType;
    render(
      <StateProvider>
        <TaskForm
          setTaskFormActive={mockSetTaskFormActive}
          task={mockTask}
          setCurrentTask={mockSetCurrentTask}
        />
      </StateProvider>
    );
    act(() => fireEvent.click(screen.getByTestId("set-edit-title-mode")));
    act(() => fireEvent.click(screen.getByTestId("save-form-span")));
  });

  it("renders and click on saveForm button", () => {
    const mockSetCurrentTask = vi.fn();
    const mockSetTaskFormActive = vi.fn();
    const mockTask = {
      title: "id:Task Form",
      status: "todo",
      id: "1",
    } as TaskType;
    render(
      <StateProvider>
        <TaskForm
          setTaskFormActive={mockSetTaskFormActive}
          task={mockTask}
          setCurrentTask={mockSetCurrentTask}
        />
      </StateProvider>
    );
    act(() => fireEvent.click(screen.getByTestId("set-edit-title-mode")));
    act(() => fireEvent.click(screen.getByTestId("save-form-button")));
  });

  it("renders and input on description-textarea", () => {
    const mockSetCurrentTask = vi.fn();
    const mockSetTaskFormActive = vi.fn();
    const mockTask = {
      title: "id:Task Form",
      status: "todo",
      id: "1",
    } as TaskType;
    render(
      <StateProvider>
        <TaskForm
          setTaskFormActive={mockSetTaskFormActive}
          task={mockTask}
          setCurrentTask={mockSetCurrentTask}
        />
      </StateProvider>
    );
    act(() => fireEvent.click(screen.getByTestId("set-edit-title-mode")));
    fireEvent.input(screen.getByTestId("description-textarea"), {
      target: {
        value: "test",
      },
    });
  });

  it("renders and change on status-select", () => {
    const mockSetCurrentTask = vi.fn();
    const mockSetTaskFormActive = vi.fn();
    const mockTask = {
      title: "id:Task Form",
      status: "todo",
      id: "1",
    } as TaskType;
    render(
      <StateProvider>
        <TaskForm
          setTaskFormActive={mockSetTaskFormActive}
          task={mockTask}
          setCurrentTask={mockSetCurrentTask}
        />
      </StateProvider>
    );
    act(() => fireEvent.click(screen.getByTestId("set-edit-title-mode")));
    fireEvent.change(screen.getByTestId("status-select"), {
      target: {
        value: "doing",
      },
    });
  });

  it("renders and input on title-input", () => {
    const mockSetCurrentTask = vi.fn();
    const mockSetTaskFormActive = vi.fn();
    const mockTask = {
      title: "id:Task Form",
      status: "todo",
      id: "1",
    } as TaskType;
    render(
      <StateProvider>
        <TaskForm
          setTaskFormActive={mockSetTaskFormActive}
          task={mockTask}
          setCurrentTask={mockSetCurrentTask}
        />
      </StateProvider>
    );
    act(() => fireEvent.click(screen.getByTestId("set-edit-title-mode")));
    fireEvent.change(screen.getByTestId("title-input"), {
      target: {
        value: "title",
      },
    });
  });
});
