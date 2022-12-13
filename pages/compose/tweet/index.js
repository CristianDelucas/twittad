import AppLayout from "components/AppLayout/AppLayout"
import Button from "components/Button/index"
import useUser from "hooks/useUser"
import { useRouter } from "next/router"
import { useState } from "react"
import { addDevit } from "../../../firebase/client"

export default function ComposeTweet() {
  const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 0,
    SUCCESS: 1,
    ERROR: -1,
  }

  const router = useRouter()
  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState("")

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="¿Qué esta pasando?"
            value={message}
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Twitaddear</Button>
          </div>
        </form>
      </AppLayout>

      <style jsx>{`
        div {
          padding: 15px;
        }

        textarea {
          border: 0;
          min-height: 200px;
          font-size: 21px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
