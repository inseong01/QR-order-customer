import { TableList } from "@/types/common";
import AllOfOrderList from "./order-list";
import VerticalStackGroup from "feature/table/(router)/components/vertical-stack/stack-index";
import Divider from "feature/table/(router)/components/line/line-index";

export default function OrderList({
  orderListArr,
}: {
  orderListArr: TableList["order"];
}) {
  return <DataComponent orderListArr={orderListArr} />;
}

function DataComponent({ orderListArr }: { orderListArr: TableList["order"] }) {
  return orderListArr.map((list, idx) => {
    return (
      <VerticalStackGroup key={idx} tag="li" gap="gap-5">
        <VerticalStackGroup tag="div" gap="gap-2.5">
          <p>{orderListArr.length - idx}번째 주문</p>
          <Divider />
        </VerticalStackGroup>
        <AllOfOrderList listData={list.orderList} />
      </VerticalStackGroup>
    );
  });
}
