import { useEffect } from "react"
import Head from "next/head"

import Button from "components/Button"
import GitHub from "components/Icons/GitHub"
import Google from "components/Icons/Google"
import { colors } from "styles/theme"

import { loginWithGitHub, loginWithGoogle } from "../firebase/client"

import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClickGithub = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  const handleClickGoogle = () => {
    loginWithGoogle().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>Twittad 📧</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <img src="/logo-twittad.png" />
        <h1>Twittad</h1>
        <h2>
          Pequeña red social
          <br />
          de gente guay 👩‍💻👨‍💻
        </h2>

        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <>
              <Button className="" onClick={handleClickGithub}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>

              <Button onClick={handleClickGoogle}>
                <Google fill="#fff" width={24} height={24} />
                Login with Gmail
              </Button>
            </>
          )}

          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
