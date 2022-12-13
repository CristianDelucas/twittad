import { useEffect, useState } from "react"
import { onAuthStateChangedControl } from "../firebase/client"
import { useRouter } from "next/router"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined,
}

export default function useUser() {
  const router = useRouter()
  const [user, setUser] = useState(USER_STATES.NOT_KNOW)

  useEffect(() => {
    onAuthStateChangedControl(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])

  return user
}
