"use client";

import { useBoundStore } from "@/lib/store/useBoundStore";
import { orderListQueryOption } from "@/lib/function/useQuery/queryOption";

import { useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ReactNode } from "react";
import Link from "next/link";

export default function Modal() {
  const type = useBoundStore((state) => state.modalState.type);
  const isOpenModal = useBoundStore((state) => state.modalState.isOpen);
  const submitStatus = useBoundStore((state) => state.submitState.status);

  switch (type) {
    case "orderCheck": {
      return (
        <>
          <DialogFrame id="orderCheck" isOpen={isOpenModal}>
            <TopComp context={"주문하시겠습니까?"} />
            <BottomComp type={"choice"} />
          </DialogFrame>
          <DialogBackDrop />
        </>
      );
    }
    case "request": {
      const context =
        submitStatus === "fulfilled" ? "요청되었습니다" : "요청되지 않았습니다";
      return (
        <>
          <DialogFrame id="request" isOpen={isOpenModal}>
            <TopComp context={context} />
            <BottomComp type={"confirm"} />
          </DialogFrame>
          <DialogBackDrop />
        </>
      );
    }
  }
}

function DialogFrame({
  children,
  id,
  isOpen,
}: {
  children: ReactNode;
  id: string;
  isOpen: boolean;
}) {
  return (
    <motion.dialog
      id={id}
      className={
        "-transalte-1/2 fixed top-1/2 left-1/2 z-99 h-1/10 max-h-[145px] min-h-[120px] w-13/20 max-w-[500px] min-w-[200px] cursor-default rounded-[10px] border-[1px] border-[#e6e6e6] bg-white"
      }
      open={isOpen}
      style={{ translateX: "-50%", translateY: "-50%" }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.3 }}
    >
      {children}
    </motion.dialog>
  );
}

function BottomComp({ type }: { type: ReactNode }) {
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const resetCallState = useBoundStore((state) => state.resetCallState);
  const fetchOrderSubmitState = useBoundStore(
    (state) => state.fetchOrderSubmitState,
  );

  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );

  switch (type) {
    case "confirm": {
      function onClickContinue() {
        if (isSubmit) return;
        resetCallState();
      }

      return (
        <Link
          href={`/${tableName}`}
          replace={true}
          className={"flex h-2/5 w-full border-t-[1px] border-[#e6e6e6]"}
        >
          <Button title="확인" onClick={onClickContinue} />
        </Link>
      );
    }
    case "choice": {
      // db 제출 허용, '예'
      function onClickPermission() {
        if (isSubmit) return;
        // 주문 전달
        fetchOrderSubmitState({
          pickUpList,
          submitError: queryState?.status === "error",
        });
        // 모달 닫기
        setModalOpen({ isOpen: false });
      }

      // db 제출 거부, '아니요'
      function onClickRejection() {
        setModalOpen({ isOpen: false });
      }

      return (
        <nav className="flex h-2/5 w-full divide-x-[1px] divide-[#e6e6e6] border-t-[1px] border-[#e6e6e6]">
          <Button title="아니요" onClick={onClickRejection} />
          <Button title="예" onClick={onClickPermission} />
        </nav>
      );
    }
  }
}

function Button({ onClick, title }: { onClick: () => void; title: string }) {
  return (
    <button
      className={`flex h-full w-1/2 flex-1 cursor-pointer items-center justify-center text-xs text-[#808080]`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

function TopComp({ context }: { context: string }) {
  return (
    <div className={"flex h-3/5 w-full items-center justify-center"}>
      {context}
    </div>
  );
}

function DialogBackDrop() {
  return (
    <motion.div
      className={
        "fixed top-0 left-0 z-9 h-full w-full bg-black/30 backdrop-blur-xs"
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    ></motion.div>
  );
}
