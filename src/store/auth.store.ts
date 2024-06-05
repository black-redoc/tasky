import { atom } from "nanostores";


type User = {
  email?: string;
  username?: string;
}

export const userStore = atom({} as User);

export const isLoggedIn = () => {
  const user = userStore.get();
  if (user.email) {
    return true
  }
  return false;
}

export const getUserInitials = () => {
  const user = userStore.get()
  return user.username?.substring(0, 2)?.toUpperCase() ?? ''
}

export const loginStore = ({ email, username }: { email: string; username: string; }) => {
  userStore.set({ email, username })
}

export const initUser = ({ username }: { username: string }) => {
  userStore.set({ username: username })
}
