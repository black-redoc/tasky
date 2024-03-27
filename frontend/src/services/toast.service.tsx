import { useState } from "react"

export const [toast, setToast] = useState({
  show: false,
  message: ''
})