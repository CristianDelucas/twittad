import styles from "../../styles/Timeline.module.css";
import Link from "next/link";

export default function Timeline({ userName }) {
  return (
    <div>
      <h1 className={styles.h1}>This is the timeline of {userName}</h1>
      <Link href="/">Home</Link>
    </div>
  );
}

Timeline.getInitialProps = () => {
  return fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
    .then(response => {
      console.log(response)
      const {userName} = response;
      return {userName}
    })
};
