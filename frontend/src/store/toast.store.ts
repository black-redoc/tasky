import { atom } from "nanostores";

export const toastMessage = atom({} as any);

export const isToastActive = () => {
  return toastMessage.get().message?.length;
};

export const closeToast = () => {
  toastMessage.set("");
};

export const setToastMessage = ({
  message,
  isError = false,
}: {
  message: string;
  isError?: boolean;
}) => {
  toastMessage.set({ message, isError });
};
