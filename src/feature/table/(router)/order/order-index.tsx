"use client";

import { useBoundStore } from "@/lib/store/useBoundStore";
import AppVisitorHeader from "feature/table/(router)/components/header/header-index";
import SubmitButton from "feature/table/components/submit-button/button-index";
import AlertModal from "feature/components/modal/alert-modal/modal-index";
import OrderProcedure from "./order-main/main-index";
import RoutePageFrame from "../components/frame/page/page-index";

import { useEffect } from "react";

export default function OrderPage() {
  const setModalType = useBoundStore((state) => state.setModalType);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setModalType({ type: "orderCheck" });
    setRequestClick({ isClicked: false });
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
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);
  const isNext = useBoundStore((state) => state.submitState.isNext);

  return (
    <SubmitButton
      type={isNext ? "back" : currentOrderList.length !== 0 ? "order" : "back"}
    />
  );
}
