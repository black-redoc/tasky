import { vi, describe, it, expect } from "vitest";
import { uuidv4 } from "../uuid.service";

describe("Test UUID Service", () => {
  it("Should return a unique UUID string", async () => {
    const expected_value = "12345678-1234-5678-1234-567812345678";
    const mock = vi.fn().mockImplementation(uuidv4)
    mock.mockResolvedValue(expected_value)

    expect(await mock()).toEqual(expected_value)
    expect(mock).toHaveBeenCalledTimes(1)
  })

  it("Should return a random UUID value", () => {
    const result = uuidv4()
    expect(result).to.toBeTruthy()
  })
})