import { describe, expect, it, vi, beforeEach, afterEach, Mock } from "vitest";
import { createProject, deleteProject, getProjects, updateProject } from "../projects.service";
import { loadEnvConfig } from "@next/env";

describe("Projects service", () => {
  beforeEach(() => {
    const projectDir = process.cwd();
    loadEnvConfig(projectDir);
  });

  afterEach(() => {
    // restoring date after each test run
    vi.resetAllMocks();
  });

  it("should get projects", async () => {
    const expected_value = { projects: [] };
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => expected_value, status: 200 })
    ) as Mock;
    const mock = vi.fn().mockImplementation(getProjects);
    mock.mockResolvedValue(expected_value);
    const res = await getProjects();
    expect(res).toBe(expected_value);
  });

  it("should createProject a project", async () => {
    const expected_value = "Success";
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => expected_value })
    ) as Mock;
    const mock = vi.fn().mockImplementation(createProject);
    mock.mockResolvedValue(expected_value);
    const res = await createProject({ name: "test" });
    expect(res).toBe(expected_value);
  })

  it("should updateProject a project", async () => {
    const expected_value = 200;
    vi.stubGlobal("fetch", () => Promise.resolve({ status: 200 }))
    const mock = vi.fn().mockImplementation(updateProject);
    mock.mockResolvedValue(expected_value);
    const res = await updateProject({ title: "test" });
    expect(res).toBe(expected_value);
  })

  it("should deleteProject a project", async () => {
    const expected_value = "Success";
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => expected_value })
    ) as Mock;
    const mock = vi.fn().mockImplementation(deleteProject);
    mock.mockResolvedValue(expected_value);
    const res = await deleteProject({ id: 1 });
    expect(res).toBe(expected_value);
  })
});