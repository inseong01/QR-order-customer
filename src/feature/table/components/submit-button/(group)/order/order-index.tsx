import { useBoundStore } from "@/lib/store/useBoundStore";
import DisplayTotalPrice from "feature/table/(router)/components/main/display/total-price/price-index";

import { useEffect, useState } from "react";

// Top
export function TotalPrice() {
  // store
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  // variant
  const totalPrice = pickUpList.reduce(
    (prev, curr) => prev + curr.price * curr.amount,
    0,
  );
  const totalPriceToString = totalPrice.toLocaleString();

  return <DisplayTotalPrice title="합계" price={totalPriceToString} />;
}

// Bottom
export function SubmitOrder() {
  // store
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  // useState
  const [isClickAble, setClickAble] = useState(false);

  // // 클릭 지연, orderListQueryOption 에러 확인 목적
  useEffect(() => {
    const timer = setTimeout(() => {
      setClickAble(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // // 주문하기
  function onClickSubmitOrderList() {
    if (!isClickAble) return;
    setModalOpen({ isOpen: true });
  }

  return (
    <button
      className="flex h-full w-full cursor-pointer items-center justify-center p-4"
      // className={`${styles.bottom} ${isClickAble ? "" : styles.able}`}
      onClick={onClickSubmitOrderList}
    >
      주문하기
    </button>
  );
}
