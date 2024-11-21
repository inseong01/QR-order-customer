import firebaseConfig from "../firebase/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebase = initializeApp(firebaseConfig);
export const db = getDatabase(firebase);
