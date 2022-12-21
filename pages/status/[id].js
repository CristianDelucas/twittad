import { useRouter } from "next/router"
import Devit from "../../components/Devit"
import { firestore } from "../../firebase/admin"

export default function DevitPag(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando...</h1>

  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "Ptv7eG1BxFT6L0oFi4SN" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // params, req, query
  const { params } = context
  const { id } = params

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// export async function getServerSideProps(context) {
//   // params, req, res, query
//   const { params, res } = context
//   const { id } = params

//   const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return { props }
//   }
//   if (res) {
//     res.writeHead(404).end()
//     // res.writeHead(301, {Location: "/404"}).end()
//   }
// }

// DevitPag.getInitialProps = (context) => {
//   const { query, res } = context
//   const { id } = query

//   return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
//     if (apiResponse.ok) {
//       return apiResponse.json()
//     }
//     if (res) {
//       res.writeHead(404).end()
//       // res.writeHead(301, {Location: "/404"}).end()
//     }
//   })
// }
