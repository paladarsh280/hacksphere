import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWqqQnt0d3D-Ogii22RFYCGdISSHRf9ho",
  authDomain: "traveela.firebaseapp.com",
  projectId: "traveela",
  storageBucket: "traveela.firebasestorage.app",
  messagingSenderId: "712571849404",
  appId: "1:712571849404:web:5835195f20cf90482f9eb9",
  measurementId: "G-N2RRTES8MN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.log("Google Login Error:", error);
    return null;
  }
};