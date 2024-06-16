import { useState } from "react";

export const useCustomHookToast = () =>
  useState({
    show: false,
    message: "",
  });
