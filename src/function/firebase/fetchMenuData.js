import { child, get, ref } from "firebase/database";
import { db } from "./firebase.js";

export default function fetchMenuData(type) {
  const user = 'admin00'
  const data = get(child(ref(db), `/qr-order-server/${user}/${type}`))
    .then((snapshot) => {
      if (!snapshot.exists()) throw new Error(`Do data in /qr-order-server/${user}/${type}`)
      return snapshot.val();
    })
    .catch((err) => {
      console.error(err);
      return;
    })

  return data;
}