import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"
import Link from "next/link"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import Create from "components/Icons/Create"
import { colors } from "../../styles/theme"
import Head from "next/head"
export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  console.log(timeline)

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <Head>
          <title>Inicio / Twittad</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ createdAt, img, id, userName, avatar, content, userId }) => (
              <Devit
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                img={img}
                key={id}
                content={content}
                userName={userName}
                userId={userId}
              />
            )
          )}
        </section>
        <nav>
          <Link legacyBehavior href={"home"}>
            <a>
              <Home width={32} height={32} stroke={"#09f"} />
            </a>
          </Link>
          <Link legacyBehavior href={"search"}>
            <a>
              <Search Search width={32} height={32} stroke={"#09f"} />
            </a>
          </Link>
          <Link legacyBehavior href={"compose/tweet"}>
            <a>
              <Create width={32} height={32} stroke={"#09f"} />
            </a>
          </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        section {
          flex: 1;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
