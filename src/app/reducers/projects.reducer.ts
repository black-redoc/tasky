import { TaskType } from "./tasks.reducer";

export const initialState = {
  projects: [] as ProjectType[]
}

export type ProjectType = {
  id: string | number;
  title: string;
  description: string;
  tasks: TaskType[]
}

export type ActionState = {
  type: string;
  payload: ProjectType | ProjectType[];
}

export type ProjectStateType = {
  projects: ProjectType[]
}

export default function projectsReducer(state: ProjectStateType, action: ActionState): ProjectStateType {
  if (action.type === 'ADD_ALL') {
    return {
      ...state,
      ...action.payload
    }
  }
  const payload = action.payload as ProjectType
  if (action.type === 'CREATE_PROJECT') {
    return {
      ...state,
      projects: [...state.projects, { ...payload, tasks: [] as TaskType[] }]
    }
  } else if (action.type === 'UPDATE_PROJECT') {
    return {
      ...state,
      projects: state.projects.map(project =>
        project.id === payload.id ? payload : project
      )
    }
  } else if (action.type === 'DELETE_PROJECT') {
    return {
      ...state,
      projects: state.projects.filter(project => project.id !== payload.id)
    }
  } else if (action.type === 'ADD_TASK') {
    const task = payload.tasks[0]
    return {
      ...state,
      projects: state.projects.map(project =>
        project.id === task.project_id ? {
          ...project,
          tasks: [...project.tasks, task]
        } : project
      )
    }
  } else if (action.type === 'UPDATE_TASK') {
    const task = payload.tasks[0]
    return {
      ...state,
      projects: state.projects.map(project =>
        project.id === task.project_id ? {
          ...project,
          tasks: project.tasks.map(t => t.id === task.id ? task : t)
        } : project
      )
    }
  }
  return state
}

export const initialProjectFormState = {
  isOpen: false
}

export type ActionProjectFormState = {
  type: string;
}

export type ProjectFormState = {
  isOpen: boolean
}

export function projectFormReducer(state: ProjectFormState, action: ActionProjectFormState) {
  if (action.type === 'CLOSE_FORM') {
    return {
      ...state, isOpen: false
    }
  } else if (action.type === 'OPEN_FORM') {
    return {
      ...state, isOpen: true
    }
  }
  return state
}

export const initialEditingProjectState = {
  project: {} as ProjectType
}

export type EditingProjectState = {
  project: ProjectType;
}

export type ActionEditingProjectState = {
  type: string;
  payload: {
    project: ProjectType;
  }
}

export function editingProjectReducer(state: EditingProjectState, action: ActionEditingProjectState) {
  if (action.type === 'SET_EDITING_PROJECT') {
    return {
      ...state,
      project: action.payload.project
    }
  } else if (action.type === 'UNSET_EDITING_PROJECT') {
    return {
      ...state,
      project: {} as ProjectType
    }
  }
  return state
}
