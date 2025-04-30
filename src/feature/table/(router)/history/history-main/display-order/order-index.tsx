import { MsgType, TableList } from "@/types/common";
import AllOfOrderList from "./order-list";

export default function OrderList({
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
