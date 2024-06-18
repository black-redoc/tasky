import { loadEnvConfig } from "@next/env";
import { createTask, deleteTask, updateTask } from "../tasks.repository";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { isErrored } from "stream";

describe("Tasks repository", () => {
  beforeEach(() => {
    const projectDir = process.cwd();
    loadEnvConfig(projectDir);
  });

  afterEach(() => {
    // restoring date after each test run
    vi.resetAllMocks();
  });

  it("Should create a task", async () => {
    const task = {
      id: '1',
      title: "title",
      description: 'description',
      project_id: 1,
      status: "todo",
      edit: false
    };
    const isAuth = true;
    const project_id = 1;
    const taskDispatch = vi.fn();
    const projectDispatch = vi.fn();
    const expected_result = {
      message: `Saved task`,
    };
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(expected_result),
      })
    );
    vi.fn().mockImplementation(createTask).mockResolvedValue(expected_result);
    const result = await createTask({
      isAuth,
      task,
      project_id,
      taskDispatch,
      projectDispatch,
    });
    expect(result).toBeTruthy();
    expect(result).toEqual(expected_result);
  });

  it("Should notcreate a task", async () => {
    const task = {
      id: '1',
      title: "title",
      description: 'description',
      project_id: 1,
      status: "todo",
      edit: false
    };
    const isAuth = true;
    const project_id = 1;
    const taskDispatch = vi.fn();
    const projectDispatch = vi.fn();
    const expected_result = {
      error: 'error',
      message: 'error',
      isError: true
    };
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(expected_result),
      })
    );
    vi.fn().mockImplementation(createTask).mockResolvedValue(expected_result);
    const result = await createTask({
      isAuth,
      task,
      project_id,
      taskDispatch,
      projectDispatch,
    });
    expect(result).toBeTruthy();
    expect(result).toEqual({
      message: expected_result.message,
      isError: expected_result.isError
    });
  });

  it("Should update a task", async () => {
    const task = {
      id: '1',
      title: "title",
      description: 'description',
      project_id: 1,
      status: "todo",
      edit: false
    };
    const isAuth = true;
    const taskDispatch = vi.fn();
    const projectDispatch = vi.fn();
    const expected_result = {
      message: `Updated task`,
    };
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(expected_result),
      })
    );
    vi.fn().mockImplementation(updateTask).mockResolvedValue(expected_result);
    const result = await updateTask({
      isAuth,
      task,
      taskDispatch,
      projectDispatch,
    });
    expect(result).toBeTruthy();
    expect(result).toEqual(expected_result);
  });

  it("Should not update a task", async () => {
    const task = {
      id: '1',
      title: "title",
      description: 'description',
      project_id: 1,
      status: "todo",
      edit: false
    };
    const isAuth = true;
    const taskDispatch = vi.fn();
    const projectDispatch = vi.fn();
    const expected_result = {
      error: 'error',
      message: 'error',
      isError: true
    };
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(expected_result),
      })
    );
    vi.fn().mockImplementation(updateTask).mockResolvedValue(expected_result);
    const result = await updateTask({
      isAuth,
      task,
      taskDispatch,
      projectDispatch,
    });
    expect(result).toBeTruthy();
    expect(result).toEqual({
      message: expected_result.message,
      isError: expected_result.isError
    });
  });

  it("Should delete a task", async () => {
    const task = {
      id: '1',
      title: "title",
      description: 'description',
      project_id: 1,
      status: "todo",
      edit: false
    };
    const isAuth = true;
    const taskDispatch = vi.fn();
    const projectDispatch = vi.fn();
    const expected_result = {
      message: `Deleted task`,
    };
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(expected_result),
      })
    );
    vi.fn().mockImplementation(deleteTask).mockResolvedValue(expected_result);
    const result = await deleteTask({
      isAuth,
      task,
      taskDispatch,
      projectDispatch
    });
    expect(result).toBeTruthy();
    expect(result).toEqual(expected_result);
  });

  it("Should not delete a task", async () => {
    const task = {
      id: '1',
      title: "title",
      description: 'description',
      project_id: 1,
      status: "todo",
      edit: false
    };
    const isAuth = true;
    const taskDispatch = vi.fn();
    const projectDispatch = vi.fn();
    const expected_result = {
      error: 'error',
      message: 'error',
      isError: true
    };
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(expected_result),
      })
    );
    vi.fn().mockImplementation(deleteTask).mockResolvedValue(expected_result);
    const result = await deleteTask({
      isAuth,
      task,
      taskDispatch,
      projectDispatch
    });
    expect(result).toBeTruthy();
    expect(result).toEqual({
      message: expected_result.message,
      isError: expected_result.isError
    });
  });
});
