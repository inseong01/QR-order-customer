// [
//   {
//     "id": "129288ad-5705-4977-b2a6-25833b721fdf",
//     "created_at": "2024-12-01 02:33:05+00",
//     "order": [
//       {
//         "id": 1,
//         "name": "음식 0",
//         "sort": "메인메뉴",
//         "price": 1000,
//         "amount": 2
//       },
//       {
//         "id": 2,
//         "name": "음식 1",
//         "sort": "메인메뉴",
//         "price": 1000,
//         "amount": 1
//       },
//       {
//         "id": 3,
//         "name": "음식 2",
//         "sort": "메인메뉴",
//         "price": 2000,
//         "amount": 1
//       },
//       {
//         "id": 4,
//         "name": "음식 3",
//         "sort": "메인메뉴",
//         "price": 3000,
//         "amount": 1
//       }
//     ]
//   }
// ]

function createReceipt(orderList) {
  const billArr = [];
  const allMenuObj = {};
  const flatOrderListArr = orderList.flat();
  // 중복 메뉴 계산
  for (let i = 0; i < flatOrderListArr.length; i++) {
    allMenuObj[flatOrderListArr[i].name] = {
      name: flatOrderListArr[i].name,
      price: flatOrderListArr[i].price,
      amount: allMenuObj[flatOrderListArr[i].name]?.amount + flatOrderListArr[i].amount || flatOrderListArr[i].amount
    }
  }
  // 메뉴 배열화
  for (let i = 0; i < Object.keys(allMenuObj).length; i++) {
    const key = Object.keys(allMenuObj)[i];
    billArr.push(allMenuObj[key])
  }
  // 영수증 반환
  return billArr;
}

export default createReceipt;