import styles from "@/style/OrderList.module.css";
import { useBoundStore } from "@/lib/store/useBoundStore";
import { orderListQueryOption } from "@/lib/function/useQuery/queryOption";
import { OrderListType, TableList } from "@/types/common";
import OrderListBox from "../order/OrderListBox";

import { useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function CurrentOrderList() {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  // useQueryClient
  const queryClient = useQueryClient();
  const orderList = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );
  // variant
  const isOk = submitStatus === "fulfilled" && orderList?.status === "success";

  return (
    <div className={styles.includeMsg}>
      <MenuListBox>
        {isOk ? (
          <CurrentListComponent queryData={orderList.data} />
        ) : (
          <EmptyListComponent />
        )}
      </MenuListBox>
      <BillInfo tableName={tableName} />
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

function BillInfo({ tableName }: { tableName: string }) {
  return (
    <div className={"flex flex-col gap-1 text-center text-xs text-[#959595]"}>
      <span>결제는 후불입니다.</span>
      <span>현재 앉아 계신 테이블 번호는 {tableName}번 입니다.</span>
    </div>
  );
}

function CurrentListComponent({ queryData }: { queryData?: TableList[] }) {
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
              <span>{amount}</span>x<span>{priceToString}원</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyListComponent() {
  return <div className={styles.empty}>접수된 주문이 없습니다.</div>;
}
