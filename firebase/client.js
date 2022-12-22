import { initializeApp } from "@firebase/app"
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
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

export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters(firebaseConfig)
  const auth = getAuth()
  return signInWithPopup(auth, googleProvider).then(
    mapUserFromFirebaseAuthToUser
  )
}

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}
export const listenLatestDevits = (callback) => {
  return onSnapshot(
    query(collection(db, "devits"), orderBy("createdAt", "desc"), limit(20)),
    ({ docs }) => {
      const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
      callback(newDevits)
    }
  )
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data
  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

// export const fetchLatestDevits = async () => {
//   return getDocs(query(collection(db, "devits"), orderBy("createdAt", "desc")))
//     .then(({ docs }) => {
//       return docs.map(mapDevitFromFirebaseToDevitObject)
//     })
//     .catch((err) => console.error(err))
// }

export const uploadImage = (file) => {
  const storage = getStorage()

  // Create a storage reference from our storage service
  const storageRef = ref(storage, `images/${file.name}`)

  // Upload the file and metadata
  const uploadTask = uploadBytesResumable(storageRef, file)

  return uploadTask
}
