"use client";

import { useBoundStore } from "@/lib/store/useBoundStore";
import { OrderListType } from "@/types/common";
import CountButton from "feature/components/count-button/button-index";

export default function CheckOrderList() {
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);
  const removePickUpMenu = useBoundStore((state) => state.removePickUpMenu);

  function onClickDeletePickUpList(id: string) {
    return () => {
      removePickUpMenu({ id });
    };
  }

  return (
    <ul className={"flex h-auto w-full flex-col gap-5"}>
      {currentOrderList.length !== 0 ? (
        <OrderList
          currentOrderList={currentOrderList}
          onClickDeleteList={onClickDeletePickUpList}
        />
      ) : (
        <EmptyListComponent />
      )}
    </ul>
  );
}

function OrderList({
  currentOrderList,
  onClickDeleteList,
}: {
  currentOrderList: OrderListType[];
  onClickDeleteList: (id: string) => () => void;
}) {
  return (
    <>
      {currentOrderList.map((list, idx) => {
        const { name, price, amount, id } = list;
        const priceToString = price.toLocaleString();
        return (
          <li key={idx} className={"flex w-full flex-col gap-5"}>
            <div className={"flex flex-col gap-2.5"}>
              <div className={"flex w-full items-center justify-between"}>
                <span>{name}</span>
                <span>{priceToString}원</span>
              </div>
              <div className={"flex w-full items-center justify-between"}>
                <div
                  className={
                    "cursor-pointer rounded-sm border-[1px] border-[#c9c9c9] px-3 py-1 text-xs leading-5 text-[#959595]"
                  }
                  onClick={onClickDeleteList(id)}
                >
                  빼기
                </div>
                <CountButton type={"pickUpList"} amount={amount} id={id} />
              </div>
            </div>
            <span id="line" className={"h-[1px] bg-[#d9d9d9]"}></span>
          </li>
        );
      })}
    </>
  );
}

function EmptyListComponent() {
  return <li>주문 목록이 없습니다.</li>;
}
