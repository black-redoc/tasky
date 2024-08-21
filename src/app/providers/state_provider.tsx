"use client";
import React, { useReducer } from "react";
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
import { tryItReducer, initialTryItState } from "../reducers/try-it.reducer";
import { isLoadingReducer, initialState as initialIsLoadingState } from "../reducers/isLoading.reducer";

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
  const [toastState, toastDispatch] = useReducer(
    toastReducer,
    toastInitialState
  );
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [editingProjectState, editingProjectDispatch] = useReducer(
    editingProjectReducer,
    initialEditingProjectState
  );
  const [tryItState, tryItDispatch] = useReducer(tryItReducer, initialTryItState);
  const [isLoadingState, isLoadingDispatch] = useReducer(
    isLoadingReducer,
    initialIsLoadingState
  );
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
        tryItState,
        isLoadingState,
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
          editingProjectDispatch,
          tryItDispatch,
          isLoadingDispatch
        }}
      >
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
