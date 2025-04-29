"use client";

import styles from "@/style/visitor/bill/BillPage.module.css";
import AppVisitorHeader from "@/components/AppVisitorHeader";
import OrderList from "@/components/OrderList";
import { useBoundStore } from "@/lib/store/useBoundStore";

import { useEffect } from "react";
import BillList from "./BillList";

export default function BillPageWrap() {
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={"계산서"} />
      <BillMain />
    </div>
  );
}

function BillMain() {
  return (
    <main
      className={
        "flex h-[calc(100vh-45px)] w-full flex-col gap-5 overflow-y-auto p-4"
      }
    >
      <BillList />
    </main>
  );
}
