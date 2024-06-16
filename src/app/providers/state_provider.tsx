"use client";
import { useReducer } from "react";
import projectsReducer, {
  editingProjectReducer,
  initialEditingProjectState,
  initialProjectFormState,
  projectFormReducer,
  initialState as projectInitialState,
} from "../reducers/projects.reducer";
import { DispatchContext, StateContext } from "../contexts/states";
import taskReducer, {
  taskFormReducer,
  initialState as taskInitialState,
  taskFormInitialState,
} from "../reducers/tasks.reducer";
import {
  authReducer,
  initialState as authInitialState,
} from "../reducers/auth.reducer";
import { toastReducer, toastInitialState } from "../reducers/toast.reducer";

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [projectState, projectDispatch] = useReducer(
    projectsReducer,
    projectInitialState,
    (args) => projectInitialState
  );
  const [taskState, taskDispatch] = useReducer(taskReducer, taskInitialState);
  const [projectFormState, projectFormDispatch] = useReducer(
    projectFormReducer,
    initialProjectFormState
  );
  const [taskFormState, taskFormDispatch] = useReducer(
    taskFormReducer,
    taskFormInitialState
  );
  const [toastState, toastDispatch] = useReducer(toastReducer, toastInitialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [editingProjectState, editingProjectDispatch] = useReducer(editingProjectReducer, initialEditingProjectState);
  return (
    <StateContext.Provider
      value={{
        projectState,
        taskState,
        projectFormState,
        taskFormState,
        authState,
        toastState,
        editingProjectState,
      }}
    >
      <DispatchContext.Provider
        value={{
          projectDispatch,
          taskDispatch,
          projectFormDispatch,
          taskFormDispatch,
          authDispatch,
          toastDispatch,
          editingProjectDispatch
        }}
      >
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
