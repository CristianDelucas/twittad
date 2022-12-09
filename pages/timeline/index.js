
import Link from "next/link";
import AppLayout from '../../components/AppLayout/AppLayout'

export default function Timeline({ userName }) {
  return (
    <AppLayout>
      <h1>This is the timeline of {userName}</h1>
      <Link href="/">Home</Link>
    </AppLayout>
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
