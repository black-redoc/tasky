"use client";
import { useState, useContext } from "react";
import { login as loginService } from "../services/auth.service";
import { md5 } from "js-md5";
import { DispatchContext } from "../contexts/states";
import { useRouter } from "next/navigation";
import Toast from "./toast";

export default function LoginForm() {
  const { toastDispatch, authDispatch } = useContext(DispatchContext);
  const { push } = useRouter();
  const ERROR_COLOR = "text-red-600";
  const HINT_COLOR = "text-cyan-500";
  const [inputHintEmail, setInputHintEmail] = useState("");
  const [inputHintPassword, setInputHintPassword] = useState("");
  const [hintColor, setHintColor] = useState(ERROR_COLOR);
  const [inputEmail, setInputEmailValue] = useState("");
  const [inputPassword, setInputPasswordValue] = useState("");
  const onChangeInputEmailValue = ({ target }: { target: HTMLInputElement }) =>
    setInputEmailValue(target.value);
  const onChangeInputPasswordValue = ({
    target,
  }: {
    target: HTMLInputElement;
  }) => setInputPasswordValue(target.value);
  const onSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!inputEmail) {
      setInputHintEmail("Email cannot be empty!");
      setHintColor(ERROR_COLOR);
      return;
    }

    if (!inputEmail.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g)) {
      setInputHintEmail("Please enter a valid email address!");
      setHintColor(HINT_COLOR);
      return;
    }
    setInputHintEmail("");
    if (!inputPassword) {
      setInputHintPassword("Password cannot be empty!");
      setHintColor(ERROR_COLOR);
      return;
    }
    setInputHintPassword("");
    const response = await loginService({
      email: inputEmail,
      password: md5(inputPassword),
    });
    if (Object.keys(response).includes("error")) {
      toastDispatch({
        type: "ON_MESSAGE",
        payload: { message: response.error, isError: true },
      });
      return;
    }
    authDispatch({ type: "LOGIN", payload: response });
    push("/");
  };
  return (
    <>
      <Toast />
      <form
        className={`
        bg-slate-200 h-[25rem] rounded-b-lg relative
        w-[22rem] flex flex-col items-center
        `}
      >
        <h1
          className={`
        bg-cyan-700
        text-slate-100
        font-semibold
        py-2
        px-5
        rounded-t-lg w-full
        `}
        >
          Login
        </h1>
        <section className="mt-12">
          <input
            data-testid="input-email"
            type="email"
            placeholder="email"
            autoFocus
            name="email"
            defaultValue={inputEmail}
            onChange={onChangeInputEmailValue}
            className={`
                w-[19rem] text-gray-600 font-normal
                focus:ring-cyan-600 ring-inset
                rounded-md block border-0 ring-1
                focus:ring-2 focus:ring-inset leading-6
                focus:border-none appearance-none
                outline-none px-5 py-1 h-10
                `}
          />
          <p
            className={`
            ${hintColor} mb-1 text-wrap
            mx-4
            `}
          >
            &nbsp;{inputHintEmail}
          </p>
          <input
            data-testid="input-password"
            type="password"
            placeholder="password"
            title="password"
            defaultValue={inputPassword}
            onChange={onChangeInputPasswordValue}
            className={`
                w-[19rem] text-gray-600 font-normal
                focus:ring-cyan-600 ring-inset
                rounded-md block border-0 ring-1
                focus:ring-2 focus:ring-inset leading-6
                focus:border-none appearance-none
                outline-none px-5 py-1 h-10
                `}
          />
          <p
            className={`
            ${hintColor} mb-2 text-wrap mx-4
            `}
          >
            &nbsp;{inputHintPassword}
          </p>
        </section>
        <section className="absolute bottom-5">
          <button
            data-testid="submit-btn"
            onClick={onSubmit}
            className={`
          bg-cyan-700 hover:bg-sky-500 w-[19rem]
          py-2 mx-3
          text-white font-semibold
          text-xl rounded-xl shadow-xl
          `}
          >
            Submit
          </button>
        </section>
      </form>
    </>
  );
}
