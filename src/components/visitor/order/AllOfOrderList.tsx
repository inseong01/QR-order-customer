import { OrderListType } from "@/types/common";
import { ReactNode } from "react";

export default function AllOfOrderList({
  listData,
}: {
  listData: OrderListType[];
}) {
  const totalPrice = listData.reduce(
    (prev, current) => prev + current.price * current.amount,
    0,
  );
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <div className={"flex h-auto w-full flex-col gap-5"}>
      <MenuListBox>
        <MenuList listData={listData} />
        <span
          id="line"
          className={"h-[1px] w-full border-[1px] border-[#c9c9c9]"}
        ></span>
        <MenuTotalPrice price={totalPriceToString} />
      </MenuListBox>
    </div>
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

function MenuListBox({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        "flex h-auto w-full cursor-default flex-col gap-4 rounded-sm border-[1px] border-[#c9c9c9] px-8 py-6"
      }
    >
      {children}
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
            <div className={"flex items-center justify-end gap-2.5 text-right"}>
              <span>{amount}</span>x
              <span className="min-w-30">{priceToString}원</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
