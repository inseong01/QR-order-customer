"use client";

import AppVisitorHeader from "@/components/AppVisitorHeader";
import { useBoundStore } from "@/lib/store/useBoundStore";
import DynamicAlertModalBox from "../../alertModal/DynamicAlertModalBox";
import CallPageMain from "./CallPageMain";
import SubmitButtonWrap from "./SubmitButtonWrap";

import { useEffect } from "react";

export default function CallPageWrap() {
  const resetCallState = useBoundStore((state) => state.resetCallState);
  const setModalType = useBoundStore((state) => state.setModalType);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    resetCallState();
    setModalType({ type: "request" });
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={"relative h-full w-full cursor-default overflow-hidden"}>
      <AppVisitorHeader title={"직원호출"} />
      <CallPageMain />
      <SubmitButtonWrap />
      <DynamicAlertModalBox />
    </div>
  );
}
