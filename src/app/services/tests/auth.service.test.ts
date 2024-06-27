import { describe, expect, it, vi, beforeEach, afterEach, Mock } from "vitest";
import { loadEnvConfig } from "@next/env";
import { login, validateUsername } from "../auth.service";

describe("auth.service", () => {
  beforeEach(() => {
    const projectDir = process.cwd();
    loadEnvConfig(projectDir);
  });

  afterEach(() => {
    // restoring date after each test run
    vi.resetAllMocks();
  });

  it("should login", async () => {
    const expected_value = "Success";
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => expected_value })
    ) as Mock;
    const mock = vi.fn().mockImplementation(login);
    mock.mockResolvedValue(expected_value);
    const res = await login({
      email: "test@test.com",
      password: "test",
    });
    expect(res).toBe(expected_value);
  });

  it("should validate username", async () => {
    const expected_value = "Success";
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => expected_value })
    ) as Mock;
    const mock = vi.fn().mockImplementation(validateUsername);
    mock.mockResolvedValue(expected_value);
    const res = await validateUsername({ username: "test" });
    expect(res).toBe(expected_value);
  });
});
