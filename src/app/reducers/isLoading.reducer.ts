export const initialState = {
  isLoading: false
}

export type IsLoadingState = {
  isLoading: boolean
}

export type ActionState = {
  type: string;
}

export function isLoadingReducer(state: IsLoadingState, action: ActionState) {
  if (action.type === 'LOADING') {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === 'LOADED') {
    return {
      ...state,
      isLoading: false
    }
  }
  return state
}
