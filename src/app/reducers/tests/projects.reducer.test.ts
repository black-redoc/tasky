import { describe, it, expect } from "vitest";
import projectsReducer, {
  ActionState,
  editingProjectReducer,
  projectFormReducer,
  ProjectType,
} from "../projects.reducer";

describe("Project reducer", () => {
  it("should return the initial state", () => {
    const initialState = {
      projects: [],
    };
    expect(
      projectsReducer(initialState, {
        type: "unknown",
        payload: {} as ProjectType,
      })
    ).toEqual(initialState);
  });

  it("should handle ADD_ALL", () => {
    const action: ActionState = {
      type: "ADD_ALL",
      payload: [
        {
          id: 1,
          title: "Project 1",
          description: "Project 1 description",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              description: "Task 1 description",
              project_id: 1,
              status: "todo",
            },
          ],
        },
      ],
    };
    const newState = projectsReducer({ projects: [] }, action);
    expect(newState).toEqual({
      projects: [
        {
          id: 1,
          title: "Project 1",
          description: "Project 1 description",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              description: "Task 1 description",
              project_id: 1,
              status: "todo",
            },
          ],
        },
      ],
    });
  });

  it("should handle CREATE_PROJECT", () => {
    const action = {
      type: "CREATE_PROJECT",
      payload: {
        id: 1,
        title: "Project 1",
        description: "Project 1 description",
        tasks: [
          {
            id: 1,
            title: "Task 1",
            description: "Task 1 description",
            project_id: 1,
            status: "todo",
          },
        ],
      },
    };
    const newState = projectsReducer({ projects: [] }, action);
    expect(newState).toEqual({
      projects: [
        {
          description: "Project 1 description",
          id: 1,
          tasks: [],
          title: "Project 1",
        },
      ],
    });
  });

  it("should handle UPDATE_PROJECT", () => {
    const expected_result = {
      projects: [
        {
          id: 1,
          title: "Project 1",
          description: "Project 1 description",
          tasks: [],
        },
        {
          id: 2,
          title: "Project2",
          description: "Description2",
          tasks: [],
        },
      ],
    };
    const action = {
      type: "UPDATE_PROJECT",
      payload: {
        id: 1,
        title: "Project 1",
        description: "Project 1 description",
        tasks: [],
      },
    };
    const newState = projectsReducer(
      {
        projects: [
          {
            id: 1,
            title: "Project",
            description: "Description",
            tasks: [],
          },
          {
            id: 2,
            title: "Project2",
            description: "Description2",
            tasks: [],
          },
        ],
      },
      action
    );
    expect(newState).toEqual(expected_result);
  });

  it("should handle DELETE_PROJECT", () => {
    const action = {
      type: "DELETE_PROJECT",
      payload: {
        id: 1,
      } as ProjectType,
    };
    const newState = projectsReducer({ projects: [] }, action);
    expect(newState).toEqual({ projects: [] });
  });

  it("should handle ADD_TASK", () => {
    const expected_result = {
      projects: [
        {
          id: 1,
          title: "Project",
          description: "Project description",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              description: "Task 1 description",
              project_id: 1,
            },
          ],
        },
        {
          id: 2,
          title: "Project2",
          description: "Project description2",
          tasks: [],
        },
      ],
    };
    const action = {
      type: "ADD_TASK",
      payload: {
        tasks: [
          {
            id: 1,
            title: "Task 1",
            description: "Task 1 description",
            project_id: 1,
          },
        ],
      } as ProjectType,
    };
    const newState = projectsReducer(
      {
        projects: [
          {
            id: 1,
            title: "Project",
            description: "Project description",
            tasks: [],
          },
          {
            id: 2,
            title: "Project2",
            description: "Project description2",
            tasks: [],
          },
        ],
      },
      action
    );
    expect(newState).toEqual(expected_result);
  });

  it("should handle UPDATE_TASK", () => {
    const expected_result = {
      projects: [
        {
          id: 1,
          title: "Project",
          description: "Description",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              description: "Description",
              project_id: 1,
              status: "doing",
            },
            {
              id: 2,
              title: "Task 2",
              description: "Description2",
              project_id: 1,
              status: "doing",
            },
          ],
        },
        {
          id: 2,
          title: "Project2",
          description: "Project description2",
          tasks: [],
        },
      ],
    };
    const action = {
      type: "UPDATE_TASK",
      payload: {
        tasks: [
          {
            id: 1,
            title: "Task 1",
            description: "Description",
            project_id: 1,
            status: "doing",
          },
        ],
      } as ProjectType,
    };
    const newState = projectsReducer(
      {
        projects: [
          {
            id: 1,
            title: "Project",
            description: "Description",
            tasks: [
              {
                id: 1,
                title: "Task 1",
                description: "Description",
                project_id: 1,
                status: "todo",
              },
              {
                id: 2,
                title: "Task 2",
                description: "Description2",
                project_id: 1,
                status: "doing",
              },
            ],
          },
          {
            id: 2,
            title: "Project2",
            description: "Project description2",
            tasks: [],
          },
        ],
      },
      action
    );
    expect(newState).toEqual(expected_result);
  });

  it("should handle DELETE_TASK", () => {
    const expected_result = {
      projects: [
        {
          id: 1,
          title: "Project",
          description: "Description",
          tasks: [],
        },
        {
          id: 2,
          title: "Project2",
          description: "Project description2",
          tasks: [],
        },
      ],
    };
    const action = {
      type: "DELETE_TASK",
      payload: {
        tasks: [
          {
            id: 1,
            project_id: 1,
          },
        ],
      } as ProjectType,
    };
    const newState = projectsReducer(
      {
        projects: [
          {
            id: 1,
            title: "Project",
            description: "Description",
            tasks: [
              {
                id: 1,
                title: "Task 1",
                description: "Description",
                project_id: 1,
                status: "doing",
              },
            ],
          },
          {
            id: 2,
            title: "Project2",
            description: "Project description2",
            tasks: [],
          },
        ],
      },
      action
    );
    expect(newState).toEqual(expected_result);
  });
});

describe("Test projectFormReducer", () => {
  it("Should CLOSE_FORM", () => {
    const action = {
      type: "CLOSE_FORM",
    };
    const newState = projectFormReducer(
      {
        isOpen: true,
      },
      action
    );
    expect(newState).toEqual({
      isOpen: false,
    });
  });

  it("Should OPEN_FORM", () => {
    const action = {
      type: "OPEN_FORM",
    };
    const newState = projectFormReducer(
      {
        isOpen: false,
      },
      action
    );
    expect(newState).toEqual({
      isOpen: true,
    });
  });

  it("Should return the current state", () => {
    const action = {
      type: "unknown",
    };
    const newState = projectFormReducer(
      {
        isOpen: true,
      },
      action
    );
    expect(newState).toEqual({
      isOpen: true,
    });
  });
});


describe("Test editingProjectReducer", () => {
  it("Should SET_EDITING_PROJECT", () => {
    const action = {
      type: "SET_EDITING_PROJECT",
      payload: {
        project: {
          id: 1,
          title: "Project",
          description: "Description",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              description: "Description",
              project_id: 1,
              status: "doing",
            },
          ],
        },
      },
    };
    const newState = editingProjectReducer(
      {
        project: {} as ProjectType,
      },
      action
    );
    expect(newState).toEqual({
      project: {
        id: 1,
        title: "Project",
        description: "Description",
        tasks: [
          {
            id: 1,
            title: "Task 1",
            description: "Description",
            project_id: 1,
            status: "doing",
          },
        ],
      },
    });
  });

  it("Should UNSET_EDITING_PROJECT", () => {
    const action = {
      type: "UNSET_EDITING_PROJECT",
      payload: {
        project: {} as ProjectType,
      }
    };
    const newState = editingProjectReducer(
      {
        project: {
          id: 1,
          title: "Project",
          description: "Description",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              description: "Description",
              project_id: 1,
              status: "doing",
            },
          ],
        },
      },
      action
    );
    expect(newState).toEqual({
      project: {} as ProjectType,
    });
  });

  it("Should return the current state", () => {
    const action = {
      type: "unknown",
      payload: {
        project: {} as ProjectType
      }
    };
    const newState = editingProjectReducer(
      {
        project: {
          id: 1,
          title: "Project",
          description: "Description",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              description: "Description",
              project_id: 1,
              status: "doing",
            },
          ],
        },
      },
      action
    );
    expect(newState).toEqual({
      project: {
        id: 1,
        title: "Project",
        description: "Description",
        tasks: [
          {
            id: 1,
            title: "Task 1",
            description: "Description",
            project_id: 1,
            status: "doing",
          },
        ],
      },
    });
  });
});