"use client";

import { calculateTotalPrice } from "@/lib/function/(router)/calculateTotalPrice";
import { TableList } from "@/types/common";
import Divider from "feature/table/(router)/components/line/line-index";
import MenuList from "feature/table/(router)/components/main/display/menu-list/list-index";
import DisplayTotalPrice from "feature/table/(router)/components/main/display/total-price/price-index";
import VerticalStackGroup from "feature/table/(router)/components/vertical-stack/stack-index";

export default function ProcessedOrderList({
  queryData,
}: {
  queryData?: TableList[];
}) {
  const latestOrder =
    queryData && queryData[0].order.findLast((order) => order);

  if (!latestOrder) return <EmptyListComponent />;

  const totalPrice = latestOrder.orderList.reduce(calculateTotalPrice, 0);
  const totalPriceToString = totalPrice?.toLocaleString();

  return (
    <>
      <VerticalStackGroup tag="div" gap="gap-5">
        <MenuList listData={latestOrder.orderList} />
      </VerticalStackGroup>
      <Divider />
      <DisplayTotalPrice title="결제금액" price={totalPriceToString} />
    </>
  );
}

function EmptyListComponent() {
  return <div className={"text-[#959595]"}>접수된 주문이 없습니다.</div>;
}
