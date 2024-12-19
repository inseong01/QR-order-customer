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