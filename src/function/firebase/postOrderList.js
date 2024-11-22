import { push, ref, set, update } from "firebase/database";
import { db } from "./firebase.js";
import fetchMenuData from "./fetchMenuData.js";

// 첫 주문 v
// db 주문목록 확인
// db 주문목록 전달

// 재주문 v
// 주문목록 추가

// 계산
// 로컬스토리지 초기화
// db 테이블 주문목록 초기화

// 로컬스토리지는 사용자 조작 가능, 서버 전송 할 때는 서버끼리 

export default async function postOrderList(tableNum, curr) {
  const user = 'admin00';
  const prevOrder = await fetchMenuData(`table/${tableNum}/orderList`);

  if (!prevOrder) {
    set(ref(db, `qr-order-server/${user}/table/${tableNum}`), { tableNum, orderList: [curr] })
      .then(() => {
        console.log('success')
      })
      .catch(err => {
        throw new Error(err)
      })
  } else {
    const updateList = [curr, ...prevOrder];
    update(ref(db, `qr-order-server/${user}/table/${tableNum}`), { orderList: updateList })
      .then(() => {
        console.log('success')
      })
      .catch(err => {
        throw new Error(err)
      });
  }
}