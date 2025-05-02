"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";
import AppVisitorHeader from "feature/table/(router)/components/header/header-index";
import SubmitButton from "feature/table/components/submit-button/button-index";
import AlertModal from "feature/components/modal/alert-modal/modal-index";
import OrderProcedure from "./order-main/main-index";
import RoutePageFrame from "../components/frame/page/page-index";

import { useEffect } from "react";

export default function OrderPage() {
  const setModalType = useBoundStore((state) => state.setModalType);
  const setFlag = useBoundStore((state) => state.setFlag);

  useEffect(() => {
    setModalType({ type: "orderCheck" });
    setFlag({ isClicked: false });
  }, []);

  return (
    <RoutePageFrame>
      <AppVisitorHeader title={"주문"} />
      <OrderProcedure />
      <SubmitButtonComp />
      <AlertModal />
    </RoutePageFrame>
  );
}

function SubmitButtonComp() {
  const currentOrderList = useBoundStore((state) => state.orderState.list);
  const isNext = useBoundStore((state) => state.submitState.isNext);

  return (
    <SubmitButton
      type={isNext ? "back" : currentOrderList.length !== 0 ? "order" : "back"}
    />
  );
}
