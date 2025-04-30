"use client";

import AppVisitorHeader from "feature/table/(router)/components/header/header-index";
import SubmitButton from "feature/components/submit-button/button-index";
import AlertModal from "feature/alert-modal/modal-index";
import { useBoundStore } from "@/lib/store/useBoundStore";
import OrderProcedure from "./order-main/main-index";

import { useEffect } from "react";

export default function OrderPage() {
  const setModalType = useBoundStore((state) => state.setModalType);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setModalType({ type: "orderCheck" });
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={"relative h-full w-full cursor-default overflow-hidden"}>
      <AppVisitorHeader title={"주문"} />
      <OrderProcedure />
      <SubmitButtonComp />
      <AlertModal />
    </div>
  );
}

function SubmitButtonComp() {
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);
  const isNext = useBoundStore((state) => state.submitState.isNext);

  return (
    <SubmitButton
      type={isNext ? "back" : currentOrderList.length !== 0 ? "order" : "back"}
    />
  );
}
