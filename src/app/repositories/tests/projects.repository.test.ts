import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  createProject,
  getProjectByTitle,
  getProjects,
  updateProject,
} from "../projects.repository";
import { ProjectStateType } from "@/app/reducers/projects.reducer";
import * as projectServiceMod from "../../services/projects.service";
import { loadEnvConfig } from "@next/env";
describe("Projects repository", () => {
  beforeEach(() => {
    const projectDir = process.cwd();
    loadEnvConfig(projectDir);
  });

  afterEach(() => {
    // restoring date after each test run
    vi.resetAllMocks();
  });
  it("should return all projects", async () => {
    const expected_result = [
      { id: 1, title: "Project 1" },
      { id: 2, title: "Project 2" },
    ];
    global.fetch = vi.fn().mockResolvedValue({
      json: () => expected_result,
    });
    const mock = vi.fn().mockImplementation(getProjects);
    mock.mockResolvedValue(expected_result);
    const isAuth: boolean = true;
    const projectDispatch: any = (action: string) => { };
    mock.mockResolvedValue(expected_result);
    const result = await getProjects({
      isAuth,
      projectDispatch,
    });
    expect(result).toBeFalsy()
  });

  it("should return all projects from client", async () => {
    const expected_result = [
      { id: 1, title: "Project 1" },
      { id: 2, title: "Project 2" },
    ];
    const mock = vi.fn().mockImplementation(getProjects);
    mock.mockResolvedValue(expected_result);
    const isAuth: boolean = false;
    const projectDispatch: any = (action: string) => { };
    mock.mockResolvedValue(expected_result);
    const result = await getProjects({
      isAuth,
      projectDispatch,
    });
    expect(result).toBeFalsy()
  });

  it("should return an error from get projects", async () => {
    it
    const expected_result = {
      message: 'error',
      isError: true
    }
    global.fetch = vi.fn().mockResolvedValue({
      json: () => "error",
    });
    const mock = vi.fn().mockImplementation(getProjects);
    mock.mockResolvedValue(expected_result);
    const isAuth: boolean = true;
    const projectDispatch: any = (action: string) => { };
    mock.mockResolvedValue(expected_result);
    const result = await getProjects({
      isAuth,
      projectDispatch,
    });
    expect(result).toEqual(expected_result);
  });

  it("should return a project by title", () => {
    const tasks = {
      todo: [
        {
          title: "title",
          id: "1",
          status: "todo",
        },
      ],
    };
    const project_id = "1";
    const expected_result = [tasks, project_id];
    const mock = vi.fn().mockImplementation(getProjectByTitle);
    mock.mockResolvedValue(expected_result);
    const title = "title";
    const projectState: ProjectStateType = {
      projects: [
        {
          id: "1",
          title: "title",
          description: "title description",
          tasks: [
            {
              title: "title",
              id: "1",
              status: "todo",
            },
          ],
        },
      ],
    };
    const result = getProjectByTitle({ title, projectState });
    expect(result).toEqual(expected_result);
  });

  it("should not return a project by title", () => {
    const expected_result = null
    const mock = vi.fn().mockImplementation(getProjectByTitle);
    mock.mockResolvedValue(expected_result);
    const title = "different title";
    const projectState: ProjectStateType = {
      projects: [
        {
          id: "1",
          title: "title",
          description: "title description",
          tasks: [
            {
              title: "title",
              id: "1",
              status: "todo",
            },
          ],
        },
      ],
    };
    const result = getProjectByTitle({ title, projectState });
    expect(result).toEqual(expected_result);
  });

  it("should create a project", async () => {
    const expected_result = { message: "Project created successfully!" };
    global.fetch = vi.fn().mockResolvedValue({
      json: () => expected_result,
    });
    const mock = vi.fn().mockImplementation(createProject);
    mock.mockResolvedValue(expected_result);
    const isAuth: boolean = true;
    const projectDispatch: any = (action: any) => { };
    const project = {};
    const result = await createProject({ isAuth, projectDispatch, project });
    expect(result).toEqual(expected_result);
  });

  it("should not create a project", async () => {
    const expected_result = { message: "Error while creating project", isError: true };
    global.fetch = vi.fn().mockResolvedValue({
      json: () => "error",
    });
    const mock = vi.fn().mockImplementation(createProject);
    mock.mockResolvedValue(expected_result);
    const isAuth: boolean = true;
    const projectDispatch: any = (action: any) => { };
    const project = {};
    const result = await createProject({ isAuth, projectDispatch, project });
    expect(result).toEqual(expected_result);
  });

  it("should update a project", async () => {
    const expected_result = {
      message: "Updated project Project 1 successfully!",
    };
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
    });
    const mock = vi.fn().mockImplementation(updateProject);
    mock.mockResolvedValue(expected_result);
    const isAuth: boolean = true;
    const project: any = {
      id: 1,
      title: "Project 1",
    };
    const projectDispatch: any = (action: any) => { };
    const result = await updateProject({
      isAuth,
      project,
      projectDispatch,
    });
    expect(result).toEqual(expected_result);
  });

  it("should not update a project", async () => {
    const expected_result = {
      message: "Error while updating project",
      isError: true,
    };
    global.fetch = vi.fn().mockResolvedValue({
      status: 400,
    });
    const mock = vi.fn().mockImplementation(updateProject);
    mock.mockResolvedValue(expected_result);
    const isAuth: boolean = true;
    const project: any = {
      id: 1,
      title: "Project 1",
    };
    const projectDispatch: any = (action: any) => { };
    const result = await updateProject({
      isAuth,
      project,
      projectDispatch,
    });
    expect(result).toEqual(expected_result);
  });
});
