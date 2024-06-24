import { initializeApp } from "firebase/app";
import { Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAwri5Jas7nH3sK14nvxutV9vyuLpn8ZxI",
  authDomain: "todo-165c7.firebaseapp.com",
  projectId: "todo-165c7",
  storageBucket: "todo-165c7.appspot.com",
  messagingSenderId: "219811191495",
  appId: "1:219811191495:web:11381a38c89333a95b7ce2",
};

const database = initializeApp(firebaseConfig);

export default database;
