"use client";

import AppVisitorHeader from "feature/table/(router)/components/header/header-index";
import { useBoundStore } from "@/lib/store/useBoundStore";
import BillPageMain from "./bill-main/main-index";

import { useEffect } from "react";

export default function BillPage() {
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={"relative h-full w-full cursor-default overflow-hidden"}>
      <AppVisitorHeader title={"계산서"} />
      <BillPageMain />
    </div>
  );
}
