"use client";

import { useBoundStore } from "@/lib/store/useBoundStore";
import { ConfirmButton, YesNoButtons } from "./modal-button";

import { motion } from "motion/react";
import { ReactNode } from "react";

export default function Modal() {
  const type = useBoundStore((state) => state.modalState.type);
  const isOpenModal = useBoundStore((state) => state.modalState.isOpen);
  const submitStatus = useBoundStore((state) => state.submitState.status);

  switch (type) {
    case "orderCheck": {
      return (
        <>
          <DialogFrame id="orderCheck" isOpen={isOpenModal}>
            <ModalHeadTitle title={"주문하시겠습니까?"} />
            <YesNoButtons />
          </DialogFrame>
          <DialogBackDrop />
        </>
      );
    }
    case "request": {
      const title =
        submitStatus === "fulfilled" ? "요청되었습니다" : "요청되지 않았습니다";
      return (
        <>
          <DialogFrame id="request" isOpen={isOpenModal}>
            <ModalHeadTitle title={title} />
            <ConfirmButton />
          </DialogFrame>
          <DialogBackDrop />
        </>
      );
    }
  }
}

function ModalHeadTitle({ title }: { title: string }) {
  return (
    <div className={"flex h-3/5 w-full items-center justify-center"}>
      {title}
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
