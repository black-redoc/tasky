const DEFAULT_BOARD = {
  todo: [],
  doing: [],
  blocked: [],
  done: [],
};

export const initialState = {
  tasks: {
    ...DEFAULT_BOARD
  },
  project_id: 0,
};

export type TaskStateType = {
  tasks: { [key: string]: TaskType[] };
};

export type TaskType = {
  id: string | number;
  title: string;
  status: string;
  description?: string;
  projectId?: string;
  edit?: boolean;
  oldStatus?: string;
  project_id?: number;
  hover?: boolean;
};

export type ActionState = {
  type: string;
  payload: {
    task: TaskType;
    tasks?: TaskStateType;
    project_id?: number | string;
  };
};

export default function taskReducer(state: TaskStateType, action: ActionState) {
  const payload = action.payload.task;
  if (action.type === "UPDATE_LAST_TASK_CREATED") {
    return {
      ...state,
      tasks: {
        ...state.tasks,
        [payload.status]: state.tasks[payload.status].map((task) => {
          if (task.id === 0) {
            return { ...payload };
          }
          return task;
        }),
      },
    };
  } else if (action.type === "SET_PROJECT_ID") {
    return {
      ...state,
      project_id: payload.project_id,
    };
  } else if (action.type === "ADD_ALL_TASKS") {
    return {
      ...structuredClone(state),
      tasks: {
        ...DEFAULT_BOARD,
        ...action.payload.tasks!,
      },
    };
  } else if (action.type === "CREATE_TASK") {
    return {
      ...structuredClone(state),
      tasks: {
        ...structuredClone(state.tasks),
        [payload.status]: [...state.tasks[payload.status], payload],
      },
    };
  } else if (action.type === "UPDATE_TASK") {
    if (payload.status !== payload.oldStatus && Boolean(payload.oldStatus)) {
      return {
        ...structuredClone(state),
        tasks: {
          ...structuredClone(state.tasks),
          [payload.status]: [...state.tasks[payload.status], { ...payload }],
          [payload.oldStatus ?? ""]: state.tasks[
            payload.oldStatus ?? ""
          ].filter((task) => task.id !== payload.id),
        },
      };
    }
    return {
      ...structuredClone(state),
      tasks: {
        ...structuredClone(state.tasks),
        [payload.status]: state.tasks[payload.status].map((task) => {
          if (task.id === payload.id) {
            return {
              ...task,
              ...payload,
            };
          }
          return task;
        }),
      },
    };
  } else if (action.type === "DELETE_TASK") {
    return {
      ...structuredClone(state),
      tasks: Object.entries(state.tasks)
        .map(([key, value]) => {
          if (key === action.payload.task.status) {
            return [
              key, value.filter((task) => task.id !== action.payload.task.id),
            ]
          }
          return [key, value]
        })
        .reduce((acc, [key, value]) => ({ ...acc, [key as any]: value }), {}),
    };
  } else if (action.type === "SET_HOVER") {
    return {
      ...structuredClone(state),
      tasks: {
        ...structuredClone(state.tasks),
        [payload.status]: state.tasks[payload.status].map((task) => {
          if (task.id === payload.id) {
            return {
              ...task,
              hover: payload.hover,
            };
          }
          return task;
        }),
      },
    };
  }
  return state;
}

export const taskFormInitialState = {
  isFormOpen: false,
};

export type TaskFormActionState = {
  type: string;
};

export function taskFormReducer(
  state: typeof taskFormInitialState,
  action: TaskFormActionState
) {
  if (action.type === "OPEN_TASK_FORM") {
    return {
      ...state,
      isFormOpen: true,
    };
  } else if (action.type === "CLOSE_TASK_FORM") {
    return {
      ...state,
      isFormOpen: false,
    };
  }
  return state;
}
