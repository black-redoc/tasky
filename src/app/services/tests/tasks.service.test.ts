import { describe, expect, it, vi, Mock } from "vitest";
import { createTask, deleteTask, updateTask } from "../tasks.service";

describe("Tasks service", () => {
  it("should create task ", async () => {
    const expected_result = "Task created successfully"
    global.fetch = vi.fn().mockResolvedValue({
      json: () => expected_result
    })
    const mock = vi.fn().mockImplementation(createTask)
    mock.mockResolvedValue(expected_result)
    const title = "Task title";
    const result = await createTask({ title })
    expect(result).toBe(expected_result)
  });

  it("should update a task", async () => {
    const expected_result = "Task updated successfully"
    global.fetch = vi.fn().mockResolvedValue({
      json: () => expected_result
    })
    const mock = vi.fn().mockImplementation(updateTask)
    mock.mockResolvedValue(expected_result)
    const title = "Task title";
    const result = await updateTask({ title })
    expect(result).toBe(expected_result)
  })

  it("should delete a task", async () => {
    const expected_result = "Task deleted successfully"
    global.fetch = vi.fn().mockResolvedValue({
      json: () => expected_result
    })
    const mock = vi.fn().mockImplementation(deleteTask)
    mock.mockResolvedValue(expected_result)
    const taskId = 1;
    const result = await deleteTask({ taskId })
    expect(result).toBe(expected_result)
  })
});