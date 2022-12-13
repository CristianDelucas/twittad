import { initializeApp } from "@firebase/app"
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore"
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGL7KKx81hoIl1_GYpRDumNDWr9QfXxxU",
  authDomain: "twittad-cf164.firebaseapp.com",
  projectId: "twittad-cf164",
  storageBucket: "twittad-cf164.appspot.com",
  messagingSenderId: "615561416684",
  appId: "1:615561416684:web:1efea99429652e78b73ac9",
  measurementId: "G-3XQQZ6ZC0T",
}

const app = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (_user) => {
  if (_user.user) {
    const { user } = _user
    const { displayName, photoURL, email, uid } = user
    return {
      avatar: photoURL,
      username: displayName,
      email,
      uid,
    }
  } else {
    const { displayName, photoURL, email, uid } = _user
    return {
      avatar: photoURL,
      username: displayName,
      email,
      uid,
    }
  }
}

export const onAuthStateChangedControl = (onChange) => {
  const auth = getAuth()
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  githubProvider.setCustomParameters(firebaseConfig)
  const auth = getAuth()
  return signInWithPopup(auth, githubProvider).then(
    mapUserFromFirebaseAuthToUser
  )
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    content,
    userId,
    userName,
    createAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return getDocs(collection(db, "devits"))
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createAt } = data
        const date = new Date(createAt.seconds * 1000)
        const normalizedCreateAt = new Intl.DateTimeFormat("es-ES").format(date)
        return {
          ...data,
          id,
          createAt: normalizedCreateAt,
        }
      })
    })
    .catch((err) => console.error(err))
}
