import { initializeApp } from "@firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGL7KKx81hoIl1_GYpRDumNDWr9QfXxxU",
    authDomain: "twittad-cf164.firebaseapp.com",
    projectId: "twittad-cf164",
    storageBucket: "twittad-cf164.appspot.com",
    messagingSenderId: "615561416684",
    appId: "1:615561416684:web:1efea99429652e78b73ac9",
    measurementId: "G-3XQQZ6ZC0T"
  };

initializeApp(firebaseConfig);

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider();
  githubProvider.setCustomParameters(firebaseConfig);
  const auth = getAuth();
  return signInWithPopup(auth, githubProvider);
};
