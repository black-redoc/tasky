import { describe, expect, it } from "vitest";
import { toastReducer } from "../toast.reducer";

describe("toast", () => {
  it("should return the initial state", () => {
    const state = {
      message: "",
      isError: false,
    };
    const expected_result = {
      message: "",
      isError: false
    };
    const action = {
      type: 'unknown',
      payload: {
        message: '',
        isError: false
      }
    }
    const result = toastReducer(state, action);
    expect(result).toEqual(expected_result);
  });

  it("should handle ON_MESSAGE", () => {
    const action = {
      type: "ON_MESSAGE",
      payload: { message: "test", isError: false },
    };
    const state = {
      message: '',
      isError: false
    }
    const expected_result = {
      message: 'test',
      isError: false
    }
    const result = toastReducer(state, action)
    expect(result).toEqual(expected_result);
  });

  it('should handle CLOSE_TOAST', () => {
    const action = {
      type: 'CLOSE_TOAST',
      payload: {
        message: '',
        isError: false
      }
    }
    const state = {
      message: 'test',
      isError: false
    }
    const expected_result = {
      message: '',
      isError: false
    }
    const result = toastReducer(state, action)
    expect(result).toEqual(expected_result);
  })
});
