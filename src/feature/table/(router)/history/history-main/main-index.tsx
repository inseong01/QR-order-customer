import { MsgType, TableList } from "@/types/common";
import { useBoundStore } from "@/lib/store/useBoundStore";
import { orderListQueryOption } from "@/lib/function/useQuery/queryOption";
import OrderList from "./display-order/order-index";
import MainTagFrame from "../../components/frame/main/main-index";
import VerticalStackGroup from "../../components/vertical-stack/stack-index";
import ExceptionMessage from "../../components/exception/show-message/message-index";
import Divider from "../../components/line/line-index";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function OrderHistory() {
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
  const error = { list: !orderList, staus: orderList?.status === "error" };
  const isError = Object.values(error).some((value) => value);
  const errorType = Object.entries(error).filter(
    ([key, value]) => value === true,
  );

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
    <MainTagFrame>
      <VerticalStackGroup tag="ul" gap="gap-5">
        {isError ? (
          <ErrorComp errorType={errorType[0]} />
        ) : (
          <OrderList orderListArr={orderListArr} />
        )}
      </VerticalStackGroup>
    </MainTagFrame>
  );
}

/**
 * OrderList 컴포넌트가 하나의 목록으로 생성되기 때문에
 * 컴포넌트 자체를 재생성해야 함
 */
function ErrorComp({ errorType }: { errorType: [string, boolean] }) {
  const [key] = errorType;
  const isServerError = key === "status";
  const title = isServerError ? "주문 내역 오류" : "주문 내역";

  return (
    <VerticalStackGroup tag="li" gap="gap-5">
      <VerticalStackGroup tag="div" gap="gap-2.5">
        <p>{title}</p>
        <Divider />
      </VerticalStackGroup>
      <ExceptionMessage domain="history" isServerError={isServerError} />
    </VerticalStackGroup>
  );
}
