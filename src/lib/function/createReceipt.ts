import { AllMenuObj, OrderListType } from '@/types/common';
/*
  {
    "히레카츠": {
        "name": "히레카츠",
        "price": 12000,
        "amount": 8
    },
    "고구마 치즈카츠": {
        "name": "고구마 치즈카츠",
        "price": 12000,
        "amount": 16
    },
  }
*/

function createReceipt(orderList: OrderListType[][]) {
  const billArr = [];
  const allMenuObj: AllMenuObj = {};
  const flatOrderListArr = orderList.flat();
  // 중복 메뉴 계산
  for (let i = 0; i < flatOrderListArr.length; i++) {
    const currentAmount = allMenuObj[flatOrderListArr[i].name]?.amount ?? 0;
    const prevAmount = flatOrderListArr[i].amount;

    allMenuObj[flatOrderListArr[i].name] = {
      id: flatOrderListArr[i].id,
      name: flatOrderListArr[i].name,
      price: flatOrderListArr[i].price,
      amount: currentAmount + prevAmount || prevAmount,
    };
  }
  // 메뉴 배열화
  for (let i = 0; i < Object.keys(allMenuObj).length; i++) {
    const key = Object.keys(allMenuObj)[i];
    billArr.push(allMenuObj[key]);
  }
  // 영수증 반환
  return billArr;
}

export default createReceipt;
