"use client";

import { OrderListType, TableList } from "@/types/common";

export default function ProcessedOrderList({
  queryData,
}: {
  queryData?: TableList[];
}) {
  const latestOrder =
    queryData && queryData[0].order.findLast((order) => order);

  if (!latestOrder) return <EmptyListComponent />;

  const totalPrice = latestOrder?.orderList.reduce(
    (prev, current) => prev + current.price * current.amount,
    0,
  );
  const totalPriceToString = totalPrice?.toLocaleString();

  return (
    <>
      <div className={"flex h-auto w-full flex-col gap-5"}>
        <MenuList listData={latestOrder?.orderList} />
      </div>
      <span
        id="line"
        className={"h-[1px] w-full border-[1px] border-[#c9c9c9]"}
      ></span>
      <MenuTotalPrice price={totalPriceToString} />
    </>
  );
}

function MenuTotalPrice({ price }: { price: string }) {
  return (
    <div className={"flex w-full justify-between"}>
      <span>결제금액</span>
      <span>{price}원</span>
    </div>
  );
}

// 모듈화
function MenuList({ listData }: { listData?: OrderListType[] }) {
  return (
    <ul className={"flex flex-col gap-4"}>
      {listData?.map((menu, idx) => {
        const { name, amount, price } = menu;
        const priceToString = price.toLocaleString();
        return (
          <li key={idx} className={"flex w-full items-center justify-between"}>
            <div>
              <span>{name}</span>
            </div>
            <div
              className={
                "flex min-w-30 items-center justify-end gap-2.5 text-right"
              }
            >
              <span>{amount}</span>x
              <span className="min-w-23">{priceToString}원</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyListComponent() {
  return <div className={"text-[#959595]"}>접수된 주문이 없습니다.</div>;
}
