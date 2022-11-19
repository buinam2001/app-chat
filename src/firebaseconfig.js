import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAZdkzHgLh10UYhysh8NB3WjODrtxIAN_U",
  authDomain: "app-chat-ce521.firebaseapp.com",
  projectId: "app-chat-ce521",
  storageBucket: "app-chat-ce521.appspot.com",
  messagingSenderId: "628707493174",
  appId: "1:628707493174:web:99dd70fa299d1282e31f97"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


export const auth = getAuth(app);