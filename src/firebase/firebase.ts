
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAEoWJ6wyb-WZPQvvAIckZaHVUpRasrR3g",
  authDomain: "equip-manager-e9b14.firebaseapp.com",
  projectId: "equip-manager-e9b14",
  storageBucket: "equip-manager-e9b14.appspot.com",
  messagingSenderId: "174174828205",
  appId: "1:174174828205:web:77ea01b092318869343824"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)