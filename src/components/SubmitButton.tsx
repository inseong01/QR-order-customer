"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useBoundStore } from "@/lib/store/useBoundStore";
import TotalPrice from "./submitButton/TotalPrice";
import PickAndCountButton from "./submitButton/PickAndCountButton";
import makeSentence from "@/lib/function/makeSentence";

// import SubmitBack from './submitButton/SubmitBack';
// import SubmitOrder from './submitButton/SubmitOrder';
// import SubmitRequest from './submitButton/SubmitRequest';

type SubmitBtn = "back" | "order" | "request";

export default function SubmitButton({ type }: { type: SubmitBtn }) {
  switch (type) {
    case "back": {
      return (
        <SubmitButtonBox initAnimation={false}>
          <BottomComp node={<SubmitBack />} />
        </SubmitButtonBox>
      );
    }
    case "order": {
      return (
        <SubmitButtonBox initAnimation={false}>
          <TopComp node={<TotalPrice />} />
          <BottomComp node={<SubmitOrder />} />
        </SubmitButtonBox>
      );
    }
    case "request": {
      return (
        <SubmitButtonBox initAnimation={true}>
          <TopComp node={<PickAndCountButton />} />
          <BottomComp node={<SubmitRequest />} />
        </SubmitButtonBox>
      );
    }
  }
}

function SubmitButtonBox({
  initAnimation,
  children,
}: {
  children: ReactNode;
  initAnimation: boolean;
}) {
  return (
    <motion.div
      className={"fixed bottom-0 left-0 h-auto w-full cursor-default"}
      initial={initAnimation ? { y: "100%" } : false}
      animate={{ y: 0 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ bounce: 0, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function TopComp({ node }: { node: ReactNode }) {
  return (
    <>
      {node && (
        <div
          className={
            "relative w-full border-t-[1px] border-[#e6e6e6] bg-white p-4"
          }
        >
          {node}
        </div>
      )}
    </>
  );
}

function BottomComp({ node }: { node: ReactNode }) {
  return (
    <nav
      className={
        "flex w-full items-center justify-center bg-[#4caff8] font-bold text-white"
      }
    >
      {node}
    </nav>
  );
}

function SubmitBack() {
  const tableName = useBoundStore((state) => state.tableState.tableName);

  return (
    <Link
      href={`/${tableName}`}
      replace={true}
      className="flex h-full w-full cursor-pointer items-center justify-center p-4"
    >
      돌아가기
    </Link>
  );
}

function SubmitOrder() {
  // store
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  // useState
  const [isClickAble, setClickAble] = useState(false);

  // // 클릭 지연, orderListQueryOption 에러 확인 목적
  useEffect(() => {
    const timer = setTimeout(() => {
      setClickAble(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // // 주문하기
  function onClickSubmitOrderList() {
    if (!isClickAble) return;
    setModalOpen({ isOpen: true });
  }

  return (
    <button
      className="flex h-full w-full cursor-pointer items-center justify-center p-4"
      // className={`${styles.bottom} ${isClickAble ? "" : styles.able}`}
      onClick={onClickSubmitOrderList}
    >
      주문하기
    </button>
  );
}

function SubmitRequest() {
  const requestList = useBoundStore((state) => state.callState.selectedItemArr);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const fetchRequestSubmitState = useBoundStore(
    (state) => state.fetchRequestSubmitState,
  );

  // 호출하기
  function onClickSubmitRequestList() {
    if (isSubmit) return;
    // 알림으로 requestList(요청) 전달
    const requestStr = makeSentence(requestList);
    fetchRequestSubmitState({ requestStr });
  }

  return (
    <button
      className={
        "flex h-full w-full cursor-pointer items-center justify-center p-4"
      }
      onClick={onClickSubmitRequestList}
    >
      요청하기
    </button>
  );
}
