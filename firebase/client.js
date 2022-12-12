import { initializeApp } from "@firebase/app"
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

initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (_user) => {
  if (_user.user) {
    const { user } = _user
    const { displayName, photoURL, email } = user
    return {
      avatar: photoURL,
      username: displayName,
      email,
    }
  } else {
    const { displayName, photoURL, email } = _user
    return {
      avatar: photoURL,
      username: displayName,
      email,
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
