"use client";

import { useBoundStore } from "@/lib/store/useBoundStore";
import AppVisitorHeader from "feature/table/(router)/components/header/header-index";
import OrderHistory from "./history-main/main-index";
import RoutePageFrame from "../components/frame/page/page-index";

import { useEffect } from "react";

export default function HistoryPage() {
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <RoutePageFrame>
      <AppVisitorHeader title={"주문내역"} />
      <OrderHistory />
    </RoutePageFrame>
  );
}
