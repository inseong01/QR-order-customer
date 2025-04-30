"use client";

import { orderListQueryOption } from "@/lib/function/useQuery/queryOption";
import { useQueryClient } from "@tanstack/react-query";
import { useBoundStore } from "@/lib/store/useBoundStore";
import { MsgType } from "@/types/common";
import Bill from "./display-bill/bill-index";

import { ReactNode } from "react";

export default function BillPageMain() {
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
    <main
      className={
        "flex h-[calc(100vh-45px)] w-full flex-col gap-5 overflow-y-auto p-4"
      }
    >
      <div className={"flex h-auto w-full flex-col gap-5"}>
        <BillInfo tableName={tableName} />
        <BillBox>
          {isError ? (
            <ExceptionMessage type={"error"} />
          ) : (
            <Bill orderListArr={orderListArr} />
          )}
        </BillBox>
      </div>
    </main>
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

function BillBox({ children }: { children: ReactNode }) {
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
