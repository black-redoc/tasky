export const toastInitialState = {
  message: '',
  isError: false
}

export type ToastType = {
  message: string;
  isError: boolean;
}

export type ToastActionState = {
  type: string;
  payload: ToastType
}

export function toastReducer(state: typeof toastInitialState, action: ToastActionState) {
  if (action.type === 'ON_MESSAGE') {
    return {
      ...state,
      message: action.payload.message,
      isError: action.payload.isError
    }
  } else if (action.type === 'CLOSE_TOAST') {
    return {
      ...state,
      message: '',
      isError: false
    }
  }
  return state
}
