import { describe, it, expect } from 'vitest';
import { authReducer, AuthState } from '../auth.reducer';

describe('authReducer', () => {
  it('should return the initial state', () => {
    const initialState: AuthState = {
      user: {},
    };
    expect(authReducer(initialState, { type: 'unknown', payload: {} })).toEqual(initialState);
  });

  it('should handle LOGGING', () => {
    const action = { type: 'LOGGING', payload: { email: 'user@example.com' } };
    const newState = authReducer({ user: { email: 'user@example.com' } }, action);
    expect(newState).toEqual({ user: { email: 'user@example.com' } });
  });

  it('should handle TRYING', () => {
    const action = { type: 'TRYING', payload: { username: 'test_username' } };
    const newState = authReducer({ user: { email: 'test_username' } }, action);
    expect(newState).toEqual({ user: { username: 'test_username' } });
  });
});