"use client";

import { useBoundStore } from "@/lib/store/useBoundStore";
import makeSentence from "@/lib/function/makeSentence";
import { CallItem } from "@/types/common";
import CountButton from "../count-button/button-index";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

type SubmitBtn = "back" | "order" | "request" | "pick" | "check";

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
    case "pick": {
      return (
        <SubmitButtonBox initAnimation={true}>
          <TopComp node={<MenuCount />} />
          <BottomComp node={<PickMenu />} />
        </SubmitButtonBox>
      );
    }
    case "check": {
      return (
        <SubmitButtonBox initAnimation={true}>
          <BottomComp node={<CheckMenu />} />
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

// 컴포넌트 위치 별 분류
function TopComp({ node }: { node: ReactNode }) {
  return (
    <div
      className={"relative w-full border-t-[1px] border-[#e6e6e6] bg-white p-4"}
    >
      {node}
    </div>
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

// 하단 컴포넌트 기능 별 분류
// 1) /[table]/category page
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

// 2) /[table] init page
function PickMenu() {
  const pickUpSelectedMenu = useBoundStore((state) => state.pickUpSelectedMenu);

  // 항목 선택
  function onClickBottom() {
    pickUpSelectedMenu();
  }

  return (
    <button
      className={
        "flex h-1/2 w-full cursor-pointer items-center justify-center bg-[#4caff8] p-4 font-semibold text-white"
      }
      onClick={onClickBottom}
    >
      <span>음식 담기</span>
    </button>
  );
}
function CheckMenu() {
  const isRequestClicked = useBoundStore(
    (state) => state.requestState.isClicked,
  );
  const setRequestClick = useBoundStore((state) => state.setRequestClick);
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const router = useRouter();

  // 주문표 확인하기
  function onClickCheckPickUpList() {
    if (isRequestClicked) return;
    setRequestClick({ isClicked: true });
    router.push(`${tableName}/order`);
  }
  return (
    <button
      className={
        "flex h-1/2 w-full cursor-pointer items-center justify-center bg-[#4caff8] p-4 font-semibold text-white"
      }
      onClick={onClickCheckPickUpList}
    >
      <span>주문표 확인하기</span>
    </button>
  );
}

// TopComp node 컴포넌트 항목
function TotalPrice() {
  // store
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  // variant
  const totalPrice = pickUpList.reduce(
    (prev, curr) => prev + curr.price * curr.amount,
    0,
  );
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <div className={"flex h-auto w-full items-center justify-between"}>
      <div>합계</div>
      <div>{totalPriceToString}원</div>
    </div>
  );
}

function PickAndCountButton() {
  const selectedItemArr = useBoundStore(
    (state) => state.callState.selectedItemArr,
  );

  return (
    <div className={"h-auto w-full"}>
      <ul className={"flex w-full flex-col gap-4"}>
        {selectedItemArr.map((item, idx) => {
          return <PickItem key={idx} item={item} />;
        })}
      </ul>
    </div>
  );
}
function PickItem({ item }: { item: CallItem }) {
  return (
    <li className={"flex h-6 w-full items-center justify-between gap-4"}>
      <div>{item.title}</div>
      {item.title !== "직원호출" && (
        <CountButton type={"call"} amount={item.amount} id={item.id} />
      )}
    </li>
  );
}

function MenuCount() {
  const selectedMenu = useBoundStore((state) => state.pickUpState.selectedMenu);
  const selectedMenuID = useBoundStore(
    (state) => state.pickUpState.selectedMenu.id,
  );
  const selectedMenuAmount = useBoundStore(
    (state) => state.pickUpState.selectedMenu.amount,
  );
  return (
    <div className={"flex h-1/2 w-full items-center justify-between bg-white"}>
      <div>
        <span className={"text-sm"}>{selectedMenu.name}</span>
      </div>
      <CountButton
        type={"pick"}
        amount={selectedMenuAmount}
        id={selectedMenuID}
      />
    </div>
  );
}
