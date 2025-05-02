"use client";

import { orderListQueryOption } from "@/lib/function/useQuery/query-option";
import { useQueryClient } from "@tanstack/react-query";
import { useBoundStore } from "@/lib/store/use-bound-store";
import Bill from "./display-bill/bill-index";
import MainTagFrame from "../../components/frame/main/main-index";
import VerticalStackGroup from "../../components/vertical-stack/stack-index";
import ExceptionMessage from "../../components/exception/show-message/message-index";

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
  const error = { table: !table, staus: table?.status === "error" };
  const isError = Object.values(error).some((value) => value);
  const errorType = Object.entries(error).filter(
    ([key, value]) => value === true,
  );
  const tableData = table?.data?.[0];
  const orderData = tableData?.order ?? [];
  const orderListArr = isError ? [] : orderData.map((list) => list.orderList);

  return (
    <MainTagFrame>
      <VerticalStackGroup tag="div" gap="gap-5">
        <BillInfo tableName={tableName} />
        <BillBox>
          {isError ? (
            <ErrorComp errorType={errorType[0]} />
          ) : (
            <Bill orderListArr={orderListArr} />
          )}
        </BillBox>
      </VerticalStackGroup>
    </MainTagFrame>
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

function ErrorComp({ errorType }: { errorType: [string, boolean] }) {
  const [key] = errorType;
  const isServerError = key === "status";

  return <ExceptionMessage domain="bill" isServerError={isServerError} />;
}
