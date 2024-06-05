import React, { useState } from "react";
import {
  validateUsername,
} from "../services/auth.service";
import { initUser } from "../store/auth.store";

export default () => {
  const ERROR_COLOR = "text-red-600";
  const HINT_COLOR = "text-cyan-500";
  const [inputHint, setInputHint] = useState("");
  const [hintColor, setHintColor] = useState(ERROR_COLOR);
  const [inputValue, setInputValue] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!inputValue) {
      setInputHint("Username cannot be empty!");
      setHintColor(ERROR_COLOR);
      return;
    }
    if (inputValue.length < 3) {
      setInputHint("Username should be at least 3 characters!");
      setHintColor(HINT_COLOR);
      return;
    }
    setInputHint("");
    const result = await validateUsername({ username: inputValue });
    if (!result.is_user_valid) {
      initUser({username: inputValue,})
      window.location.replace("/")
      return;
    }
    window.location.replace("/login")
  };

  const onChangeInputValue = ({ target }: { target: HTMLInputElement }) => {
    setInputValue(target.value);
  };
  return (
    <>
      <form className="relative h-[9rem] w-full max-w-[20rem]">
        <p
          className={`
            ${hintColor} mb-3 text-wrap
            absolute top-0 left-0 right-0
            `}
        >
          <input
            type="text"
            placeholder="username"
            autoFocus
            defaultValue={inputValue}
            onChange={onChangeInputValue}
            className={`
            w-full text-gray-600 font-normal
            focus:ring-cyan-600 ring-inset
            rounded-md block border-0 ring-1
            focus:ring-2 focus:ring-inset leading-6
            focus:border-none appearance-none
            outline-none px-5 py-1 h-10
            `}
          />
          {inputHint}
        </p>
        <button
          onClick={onSubmit}
          className={`
        bg-cyan-700 hover:bg-sky-500 w-full h-16
        text-white font-semibold
        text-2xl rounded-xl shadow-xl
        absolute bottom-0
        `}
        >
          Try it!
        </button>
      </form>
    </>
  );
};
