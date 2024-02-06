import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwmQn0vdaVrFsuGEDxekMtZZ8zHMJPGWk",
  authDomain: "fir-movie-app-ee3d0.firebaseapp.com",
  projectId: "fir-movie-app-ee3d0",
  storageBucket: "fir-movie-app-ee3d0.appspot.com",
  messagingSenderId: "231321158241",
  appId: "1:231321158241:web:a169a0a270892a08d12020"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);