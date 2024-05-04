import { atom } from "nanostores";

type ToastMessageType = {
  message?: string;
  isError?: boolean;
}

export const toastMessage = atom({} as ToastMessageType);

export const isToastActive = () => {
  return toastMessage.get().message?.length;
};

export const closeToast = () => {
  toastMessage.set({});
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
