import AppLayout from "components/AppLayout/AppLayout"
import { useEffect, useState } from "react"
import Devit from "../../components/Devit"
import { fetchLatestDevits } from "../../firebase/client"
import useUser from "../../hooks/useUser"

export default function HomePage() {
  const [timeline, setTimeLine] = useState([])

  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeLine)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                avatar={devit.avatar}
                createAt={devit.createAt}
                content={devit.content}
                id={devit.id}
                key={devit.id}
                userName={devit.userName}
                userId={devit.userId}
              />
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>

      <style jsx>
        {`
          header {
            align-items: center;
            border-bottom: 1px solid #eee;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
            display: flex;
            height: 49px;
            position: sticky;
            top: 0;
            width: 100%;
          }
          h2 {
            font-size: 21px;
            font-weight: 800;
            padding-left: 15px;
          }

          nav {
            background: #ffffff;
            bottom: 0;
            border-top: 1px solid #eee;
            height: 49px;
            position: sticky;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
