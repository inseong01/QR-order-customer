"use client";

import AppVisitorHeader from "feature/table/(router)/components/header/header-index";
import OrderHistory from "./history-main/main-index";
import { useBoundStore } from "@/lib/store/useBoundStore";

import { useEffect } from "react";

export default function HistoryPage() {
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={"relative h-full w-full cursor-default overflow-hidden"}>
      <AppVisitorHeader title={"주문내역"} />
      <OrderHistory />
    </div>
  );
}
