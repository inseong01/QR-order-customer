"use client";

import styles from "@/style/visitor/orderList/OrderListPage.module.css";
import AppVisitorHeader from "@/components/AppVisitorHeader";
import { useBoundStore } from "@/lib/store/useBoundStore";
import OrderListPageBox from "./OrderListPageBox";

import { useEffect } from "react";

export default function OrderListPageWrap() {
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={"relative h-full w-full cursor-default overflow-hidden"}>
      <AppVisitorHeader title={"주문내역"} />
      <OrderListMain />
    </div>
  );
}

function OrderListMain() {
  return (
    <main
      className={
        "flex h-[calc(100vh-45px)] w-full flex-col gap-5 overflow-y-auto p-4"
      }
    >
      <OrderListPageBox />
    </main>
  );
}
