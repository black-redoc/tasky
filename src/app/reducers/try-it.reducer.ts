export const initialTryItState = {
  enable_tryit: false
}

export type TryitState = {
  enable_tryit: boolean
}

export type ActionState = {
  type: string;
}

export function tryItReducer(state: TryitState, action: ActionState) {
  if (action.type === 'TRYIT') {
    return {
      ...state,
      enable_tryit: true
    }
  }
  return state
}