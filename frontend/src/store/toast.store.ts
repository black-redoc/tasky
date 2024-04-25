import { atom } from "nanostores";

export const toastMessage = atom('')


export const istToastActive = () => {
  return toastMessage.get().length
}

export const closeToast = () => {
  toastMessage.set('')
}

export const setToastMessage = ({ message }: { message: string }) => {
  toastMessage.set(message)
}
