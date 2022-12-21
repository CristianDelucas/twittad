import { useEffect, useState } from "react"
import Button from "components/Button"
import useUser from "hooks/useUser"

import { useRouter } from "next/router"
import { addDevit, uploadImage } from "../../../firebase/client"
import Head from "next/head"
import { getDownloadURL } from "firebase/storage"
import Avatar from "../../../components/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
        getDownloadURL(task.snapshot.ref).then((url) => setImgURL(url))
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

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
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear un Twittad / Twittad</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué esta pasando?"
            value={message}
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>X</button>
              <img src={imgURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Twittar</Button>
          </div>
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          cursor: pointer;
          color: #fff;
          font-size: 24px;
          border: 0;
          border-radius: 9999px;
          width: 32px;
          height: 32px;
          position: absolute;
          top: 15px;
          right: 15px;
        }
        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
        }

        .remove-img {
          position: relative;
        }

        form {
          margin: 10px;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATE.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
           {
            /* padding: 15px; */
          }
          outline: 0;
          resize: none;
          width: 100%;
        }

        img {
          border-radius: 10px;
          max-height: 250px;
          height: auto;
          width: 100%;
        }
      `}</style>
    </>
  )
}
