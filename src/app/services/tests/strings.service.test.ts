import { vi, it, describe, expect } from "vitest";
import { capitalize } from "../strings.service";

describe("Strings service test", () => {
  it("Capitalize should return a 'Test value'", () => {
    const expected_value = "Test value";
    const actual_value = "test value";

    const result = capitalize({ word: actual_value })

    expect(result).toEqual(expected_value);
  })
})