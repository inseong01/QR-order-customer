"use client";

import { orderListQueryOption } from "@/lib/function/useQuery/queryOption";
import { useBoundStore } from "@/lib/store/useBoundStore";
import { MsgType, TableList } from "@/types/common";
import OrderList from "@/components/OrderList";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AllOfOrderList from "./AllOfOrderList";

export default function OrderListPageBox() {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  // useQueryClient
  const queryClient = useQueryClient();
  const orderList = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );
  // useState
  const [orderListArr, setListArr] = useState<TableList["order"]>([]);
  // variant
  const isError = !orderList || orderList.status === "error";

  // 프리패치 후 최신순 정렬
  useEffect(() => {
    if (!orderList?.data) return;
    const tableData = orderList.data[0];
    const copiedOrderData = [...tableData.order].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    setListArr(copiedOrderData);
  }, [orderList]);

  return (
    <ul className={"flex h-auto w-full flex-col gap-5"}>
      {isError ? (
        <ExceptionMessage type={"error"} />
      ) : (
        <OrderListComponent orderListArr={orderListArr} />
      )}
    </ul>
  );
}

function OrderListComponent({
  orderListArr,
}: {
  orderListArr: TableList["order"];
}) {
  if (orderListArr.length === 0) return <ExceptionMessage type={"empty"} />;

  return <DataComponent orderListArr={orderListArr} />;
}

function DataComponent({ orderListArr }: { orderListArr: TableList["order"] }) {
  return orderListArr.map((list, idx) => {
    return (
      <li key={idx} className={"flex h-auto w-full flex-col gap-5"}>
        <div className={"flex w-full flex-col gap-2.5"}>
          <p>{orderListArr.length - idx}번째 주문</p>
          <span
            id="line"
            className={"h-[1px] w-full border-[1px] border-[#c9c9c9]"}
          ></span>
        </div>
        <AllOfOrderList listData={list.orderList} />
        {/* <OrderList type={"AllOforderList"} listData={list.orderList} /> */}
      </li>
    );
  });
}

function ExceptionMessage({ type }: { type: MsgType }) {
  const isError = type === "error";
  const title = isError ? `주문 내역 오류` : "주문 내역";
  const description = isError
    ? "카운터에서 확인해 주세요."
    : "주문 내역이 없습니다.";

  return (
    <li className={"flex h-auto w-full flex-col gap-5"}>
      <div className={"flex w-full flex-col gap-2.5"}>
        <p>{title}</p>
        <span className={"h-[1px] w-full border-[1px] border-[#c9c9c9]"}></span>
      </div>
      <div>
        <p className={"text-xs text-[#959595]"}>{description}</p>
      </div>
    </li>
  );
}
