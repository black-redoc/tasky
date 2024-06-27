import { describe, it, vi, Mock } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "../login-form";
import { StateProvider } from "../../providers/state_provider";
import * as Services from "../../services/auth.service";

describe("LoginForm", () => {
  it("renders", () => {
    render(
      <StateProvider>
        <LoginForm />
      </StateProvider>
    );
  });

  it("renders and submits", () => {
    vi.spyOn(Services, "login").mockImplementation(() =>
      Promise.resolve("success")
    );
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => "success" })
    ) as Mock;
    render(
      <StateProvider>
        <LoginForm />
      </StateProvider>
    );
    fireEvent.input(screen.getByTestId("input-email"), {
      target: {
        value: "user@example.com",
      },
    });
    fireEvent.input(screen.getByTestId("input-password"), {
      target: {
        value: "test-password",
      },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
  });

  it("renders and submits with error in response", () => {
    vi.spyOn(Services, "login").mockImplementation(() =>
      Promise.resolve("error")
    );
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => "error" })
    ) as Mock;
    render(
      <StateProvider>
        <LoginForm />
      </StateProvider>
    );
    fireEvent.input(screen.getByTestId("input-email"), {
      target: {
        value: "user@example.com",
      },
    });
    fireEvent.input(screen.getByTestId("input-password"), {
      target: {
        value: "test-password",
      },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
  });

  it("renders without email", () => {
    vi.spyOn(Services, "login").mockImplementation(() =>
      Promise.resolve("error")
    );
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => "error" })
    ) as Mock;
    render(
      <StateProvider>
        <LoginForm />
      </StateProvider>
    );
    fireEvent.input(screen.getByTestId("input-email"), {
      target: {
        value: "",
      },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
  });

  it("renders wit invalid email", () => {
    vi.spyOn(Services, "login").mockImplementation(() =>
      Promise.resolve("error")
    );
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => "error" })
    ) as Mock;
    render(
      <StateProvider>
        <LoginForm />
      </StateProvider>
    );
    fireEvent.input(screen.getByTestId("input-email"), {
      target: {
        value: "user",
      },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
  });

  it("renders wit invalid password", () => {
    vi.spyOn(Services, "login").mockImplementation(() =>
      Promise.resolve("error")
    );
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => "error" })
    ) as Mock;
    render(
      <StateProvider>
        <LoginForm />
      </StateProvider>
    );
    fireEvent.input(screen.getByTestId("input-email"), {
      target: {
        value: "user@example.com",
      },
    });
    fireEvent.input(screen.getByTestId("input-password"), {
      target: {
        value: "",
      },
    });
    fireEvent.click(screen.getByTestId("submit-btn"));
  });
});
