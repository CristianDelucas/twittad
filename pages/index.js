import Head from "next/head";
import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout/AppLayout";
import Button from "../components/Button";
import GitHub from "../components/Icons/Github";
import { loginWithGitHub, onAuthStateChangedControl } from "../firebase/client";
import { colors } from "../styles/theme";

export default function Home() {
  const [user, setUser] = useState(undefined);

   useEffect(()=>{
    onAuthStateChangedControl(setUser)
   },[])

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
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
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} fill="#fff" />
                Login with Github
              </Button>
            ) }
            {user && user.avatar && 
              <div>
                <img src={user.avatar}/>
                <strong>{user.username}</strong>
              </div>
            }
          </div>

          {/* <nav>
          <Link href="/timeline">Timeline</Link>
        </nav> */}
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
  );
}
