import { createContext } from "react";
import {
  ActionEditingProjectState,
  ActionProjectFormState,
  ActionState as ProjectActionState,
  ProjectFormState,
  ProjectType,
} from "../reducers/projects.reducer";
import {
  ActionState as TaskActionState,
  TaskFormActionState,
  TaskStateType,
} from "../reducers/tasks.reducer";
import { ActionState as AuthActionState, UserType } from "../reducers/auth.reducer";
import { ToastActionState, ToastType } from "../reducers/toast.reducer";
import { ActionState as ActionTryItState } from "../reducers/try-it.reducer";
import { ActionState as ActionIsLoadingState } from "../reducers/isLoading.reducer";

export const StateContext = createContext({
  projectState: { projects: [] as ProjectType[] },
  taskState: {} as TaskStateType,
  projectFormState: { isOpen: false } as ProjectFormState,
  taskFormState: {},
  authState: { user: {} as UserType },
  toastState: {} as ToastType,
  editingProjectState: { project: {} as ProjectType },
  tryItState: { enable_tryit: false },
  isLoadingState: { isLoading: false }
});
export const DispatchContext = createContext({
  projectDispatch: (action: ProjectActionState) => { },
  taskDispatch: (action: TaskActionState) => { },
  projectFormDispatch: (action: ActionProjectFormState) => { },
  taskFormDispatch: (action: TaskFormActionState) => { },
  authDispatch: (action: AuthActionState) => { },
  toastDispatch: (action: ToastActionState) => { },
  editingProjectDispatch: (action: ActionEditingProjectState) => { },
  tryItDispatch: (action: ActionTryItState) => { },
  isLoadingDispatch: (action: ActionIsLoadingState) => { }
});
