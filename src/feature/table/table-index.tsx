"use client";

import { ReactNode, useEffect } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence } from "motion/react";

import TableInitHeader from "feature/table/table-header/header-index";
import TableInitMain from "feature/table/table-main/main-index";
// import DynamicPopUp from "feature/popup/popup-index";
import { useBoundStore } from "@/lib/store/useBoundStore";
import { initCookies } from "@/lib/function/initCookies";
import { ParamsList } from "@/types/common";
import SubmitButton from "feature/components/submit-button/button-index";

export default function TableInitPage() {
  return (
    <TableInitPageBox>
      <TableInitHeader />
      <TableInitMain />
      <SubmitButtonComp />
    </TableInitPageBox>
  );
}

function TableInitPageBox({ children }: { children: ReactNode }) {
  // usePathname
  const params = useParams<ParamsList>();
  // store
  const requestIsClicked = useBoundStore(
    (state) => state.requestState.isClicked,
  );
  const modalIsOpen = useBoundStore((state) => state.modalState.isOpen);
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const setTableNumber = useBoundStore((state) => state.setTableNumber);
  const resetRequestState = useBoundStore((state) => state.resetRequestState);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const resetSubmitState = useBoundStore((state) => state.resetSubmitState);
  const resetPickUpState = useBoundStore((state) => state.resetPickUpState);
  const getSelectedMenuCategoryId = useBoundStore(
    (state) => state.getSelectedMenuCategoryId,
  );

  useEffect(() => {
    // 한 번만 지정되도록, 초기 접속 할당 중요
    if (!tableName) {
      // 테이블 - 쿠키 할당
      initCookies(params);
      // 테이블 - 전역 상태
      setTableNumber(params);
    }

    // 모달 초기화
    if (modalIsOpen) {
      setModalOpen({ isOpen: false });
    }

    // 링크 이동 초기화
    if (requestIsClicked) {
      resetRequestState();
    }

    // 제출 초기화
    if (submitStatus === "fulfilled" || submitStatus === "rejected") {
      resetSubmitState();
      resetPickUpState();
    }

    // 초기 카테고리 메뉴로 초기화
    getSelectedMenuCategoryId({ id: 1 });
  }, []);

  return (
    <div className={`relative m-auto h-auto w-full cursor-default`}>
      {children}
    </div>
  );
}

function SubmitButtonComp() {
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const pickUpIsClicked = useBoundStore((state) => state.pickUpState.isClicked);

  const shoppingcartEnable = !!pickUpList.length;
  const submitType = !shoppingcartEnable || pickUpIsClicked ? "pick" : "check";

  return (
    <AnimatePresence>
      {(pickUpList.length || pickUpIsClicked) && (
        <SubmitButton key={"submitBtn"} type={submitType} />
      )}
    </AnimatePresence>
  );
}
