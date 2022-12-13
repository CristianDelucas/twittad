import Head from "next/head"
import { useEffect } from "react"
import AppLayout from "components/AppLayout/AppLayout"
import Button from "components/Button"
import GitHub from "components/Icons/GitHub"
import { loginWithGitHub } from "firebase/client"
import { colors } from "styles/theme"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"
export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>Twittad</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <section>
          <img src="/logo-twittad.png" alt="logo-twittad" />
          <h1>twittad</h1>
          <h2>
            {" "}
            Talk about development <br />
            with developers 👧🧑
          </h2>
          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} fill="#fff" />
                Login with Github
              </Button>
            )}
            {user === USER_STATES.NOT_KNOW && <img src="/spinner.gif" />}
          </div>
        </section>
      </AppLayout>

      <style jsx>
        {`
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
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 0;
            color: ${colors.primary};
          }
          h2 {
            font-size: 16px;
            color: ${colors.secondary};
            margin: 0;
          }
        `}
      </style>
    </>
  )
}
