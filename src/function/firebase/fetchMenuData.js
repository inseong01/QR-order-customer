import { child, get, ref } from "firebase/database";
import { db } from "./firebase.js";

export default function fetchMenuData(type) {
  const user = 'admin00'
  const data = get(child(ref(db), `/qr-order-server/${user}/${type}`))
    .then((snapshot) => {
      if (!snapshot.exists()) return null;
      return snapshot.val();
    })
    .catch((err) => {
      throw new Error(err);
    })

  return data;
}