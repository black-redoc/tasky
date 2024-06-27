export const initialState = {
  user: {
  } as UserType
}

export type AuthState = {
  user: UserType
}

export type UserType = {
  username?: string;
  email?: string;
  token?: string;
}
export type ActionState = {
  type: string;
  payload: UserType
}

export function authReducer(state: AuthState, action: ActionState) {
  if (action.type === 'LOGGING') {
    return {
      ...state,
      user: {
        email: action.payload.email
      }
    }
  }
  if (action.type === 'TRYING') {
    return {
      ...state,
      user: {
        username: action.payload.username
      }
    }
  }
  return state
}
