import { describe, expect, it } from "vitest";
import taskReducer, { taskFormReducer, TaskStateType, TaskType } from "../tasks.reducer";

describe("Tasks reducer", () => {
  it("shold UPDATE_LAST_TASK_CREATED", () => {
    const expected_result = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const action = {
      type: "UPDATE_LAST_TASK_CREATED",
      payload: {
        task: {
          id: 1,
          title: "Task1",
          description: "Description1",
          project_id: 1,
          status: "todo",
        },
      },
    };
    const state = {
      tasks: {
        todo: [
          {
            id: 0,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const result = taskReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it("should SET_PROJECT_ID", () => {
    const expected_result = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const action = {
      type: "SET_PROJECT_ID",
      payload: {
        project_id: 1,
        task: {} as TaskType,
      },
    };
    const state = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const result = taskReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it("should ADD_ALL_TASKS", () => {
    const expected_result = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [
          // {
          //   id: 1,
          //   title: "Task1",
          //   description: "Description1",
          //   project_id: 1,
          //   status: "doing",
          // },
          // {
          //   id: 2,
          //   title: "Task2",
          //   description: "Description2",
          //   project_id: 1,
          //   status: "doing",
          // },
        ],
        blocked: [],
        done: [],
      },
    };
    const action = {
      type: "ADD_ALL_TASKS",
      payload: {
        task: {} as TaskType,
        tasks: {
          todo: [
            {
              id: 1,
              title: "Task1",
              description: "Description1",
              project_id: 1,
              status: "todo",
            },
            {
              id: 2,
              title: "Task2",
              description: "Description2",
              project_id: 1,
              status: "todo",
            },
          ],
        },
      } as any,
    };
    const state = {
      tasks: {
        todo: [],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const result = taskReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it("should CREATE_TASK", () => {
    const expected_result = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const action = {
      type: "CREATE_TASK",
      payload: {
        task: {
          id: 1,
          title: "Task1",
          description: "Description1",
          project_id: 1,
          status: "todo",
        },
      },
    };
    const state = {
      tasks: {
        todo: [],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const result = taskReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it("should UPDATE_TASK and update the status", () => {
    const expected_result = {
      tasks: {
        todo: [],
        doing: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "doing",
            oldStatus: "todo",
          },
        ],
        blocked: [],
        done: [],
      },
    };
    const action = {
      type: "UPDATE_TASK",
      payload: {
        task: {
          id: 1,
          title: "Task1",
          description: "Description1",
          project_id: 1,
          status: "doing",
          oldStatus: "todo",
        },
      },
    };
    const state = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const result = taskReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it("should UPDATE_TASK", () => {
    const expected_result = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const action = {
      type: "UPDATE_TASK",
      payload: {
        task: {
          id: 1,
          title: "Task1",
          description: "Description1",
          project_id: 1,
          status: "todo",
        },
      },
    };
    const state = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const result = taskReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it("should DELETE_TASK", () => {
    const expected_result = {
      tasks: {
        todo: [
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const action = {
      type: "DELETE_TASK",
      payload: {
        task: {
          id: 1,
          title: "Task1",
          description: "Description1",
          project_id: 1,
          status: "todo",
        },
      },
    };
    const state = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const result = taskReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it('should SET_HOVER', () => {
    const expected_result = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
            hover: true,
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
            hover: false,
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const action = {
      type: "SET_HOVER",
      payload: {
        task: {
          id: 1,
          title: "Task1",
          description: "Description1",
          project_id: 1,
          status: "todo",
          hover: true,
        },
      },
    };
    const state = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
            hover: false,
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
            hover: false,
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const result = taskReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it('should return current state', () => {
    const expected_result = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
            hover: false,
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
            hover: false,
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const action = {
      type: "unknown",
      payload: {
        task: {
          id: 1,
          title: "Task1",
          description: "Description1",
          project_id: 1,
          status: "todo",
          hover: false,
        },
      },
    };
    const state = {
      tasks: {
        todo: [
          {
            id: 1,
            title: "Task1",
            description: "Description1",
            project_id: 1,
            status: "todo",
            hover: false,
          },
          {
            id: 2,
            title: "Task2",
            description: "Description2",
            project_id: 1,
            status: "todo",
            hover: false,
          },
        ],
        doing: [],
        blocked: [],
        done: [],
      },
    };
    const result = taskReducer(state, action);
    expect(result).toEqual(expected_result);
  });
});


describe('taskFormReducer', () => {
  it('should OPEN_TASK_FORM', () => {
    const expected_result = {
      isFormOpen: true,
    };
    const action = {
      type: "OPEN_TASK_FORM",
    };
    const state = {
      isFormOpen: false
    };
    const result = taskFormReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it('should CLOSE_TASK_FORM', () => {
    const expected_result = {
      isFormOpen: false,
    };
    const action = {
      type: "CLOSE_TASK_FORM",
    };
    const state = {
      isFormOpen: true
    };
    const result = taskFormReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it('should return current state', () => {
    const expected_result = {
      isFormOpen: true,
    };
    const action = {
      type: "unknown",
    };
    const state = {
      isFormOpen: true
    };
    const result = taskFormReducer(state, action);
    expect(result).toEqual(expected_result);
  });
})