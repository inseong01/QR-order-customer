import styles from "@/style/OrderList.module.css";
import createReceipt from "@/lib/function/createReceipt";
import { useBoundStore } from "@/lib/store/useBoundStore";
import { orderListQueryOption } from "@/lib/function/useQuery/queryOption";
import { MsgType, OrderListType } from "@/types/common";
import OrderListBox from "../order/OrderListBox";

import { useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function BillList() {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  // useQueryClient
  const queryClient = useQueryClient();
  const table = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );
  // variant
  const isError = !table || table.status === "error";
  const tableData = table?.data?.[0];
  const orderData = tableData?.order ?? [];
  const orderListArr = isError ? [] : orderData.map((list) => list.orderList);

  return (
    <div className={"flex h-auto w-full flex-col gap-5"}>
      <BillInfo tableName={tableName} />
      <ReceiptBox>
        {isError ? (
          <ExceptionMessage type={"error"} />
        ) : (
          <Receipt orderListArr={orderListArr} />
        )}
      </ReceiptBox>
    </div>
  );
}

function BillInfo({ tableName }: { tableName: string }) {
  return (
    <div className={"flex flex-col gap-1 text-center text-xs text-[#959595]"}>
      <span>결제는 후불입니다.</span>
      <span>현재 앉아 계신 테이블 번호는 {tableName}번 입니다.</span>
    </div>
  );
}

function ReceiptBox({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        "flex h-auto w-full cursor-default flex-col gap-4 rounded border-[1px] border-[#c9c9c9] px-8 py-6"
      }
    >
      {children}
    </div>
  );
}

function Receipt({ orderListArr }: { orderListArr: OrderListType[][] }) {
  const billArr = createReceipt(orderListArr);
  const totalPrice = billArr.reduce(
    (result, data) => result + data.price * data.amount,
    0,
  );
  const totalPriceToString = totalPrice.toLocaleString();

  if (orderListArr.length === 0) return <ExceptionMessage type={"empty"} />;

  return (
    <>
      <div className={"flex h-auto w-full flex-col gap-5"}>
        <MenuList listData={billArr} />
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
            <div className={"flex items-center justify-end gap-2.5 text-right"}>
              <span>{amount}</span>x
              <span className="min-w-23">{priceToString}원</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ExceptionMessage({ type }: { type: MsgType }) {
  const isError = type === "error";
  const description = isError
    ? "목록을 불러오는 데 오류가 발생했습니다. 카운터에서 확인해 주세요."
    : "주문 내역이 없습니다.";
  return (
    <div>
      <p className={"text-xs text-[#959595]"}>{description}</p>
    </div>
  );
}
