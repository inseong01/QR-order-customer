import styles from "@/style/visitor/pickUpList/ProcessOrder.module.css";
import OrderSubmitComplete from "@/components/OrderSubmitComplete";
import OrderList from "@/components/OrderList";
import { orderListQueryOption } from "@/lib/function/useQuery/queryOption";
import { useBoundStore } from "@/lib/store/useBoundStore";
import PickUpListUl from "./PickUpListUl";
import CurrentOrderList from "./CurrentOrderList";

import { AnimatePresence, motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function ProcessOrder() {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const isNext = useBoundStore((state) => state.submitState.isNext);
  const setNexPageEnable = useBoundStore((state) => state.setNexPageEnable);
  // useQuery
  const { refetch } = useQuery(orderListQueryOption(tableName));

  // 주문 완료 시 주문 데이터 추출
  useEffect(() => {
    // 중복 refetch 제한
    if (isNext) return;
    // submitStatus 상황 별 처리
    if (!submitStatus) return;
    if (submitStatus === "pending") return;
    if (submitStatus === "fulfilled") {
      refetch();
    }
    // 화면전환 지연시간 부여, UX 개선
    let timer = setTimeout(() => {
      setNexPageEnable({ isNext: true });
    }, 500);
    return () => clearTimeout(timer);
  }, [submitStatus]);

  return (
    <AnimatePresence mode="popLayout">
      {!isNext ? (
        // AnimatePresence가 이전 컴포넌트를 인식하지 못해 로컬화 하지 않음
        <motion.main
          className={"flex h-full w-full flex-col gap-5 p-4"}
          key={"NotCompletedOrder"}
          initial={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className={"z-9 flex w-full flex-col gap-2.5 bg-white"}>
            <p className={styles.title}>주문표 목록</p>
            <span
              id="line"
              className={"h-[1px] w-full border-[1px] border-[#c9c9c9]"}
            ></span>
          </div>
          <PickUpListUl />
        </motion.main>
      ) : (
        <NextComponent />
      )}
    </AnimatePresence>
  );
}

function NextComponent() {
  return (
    <motion.main
      className={"flex h-full w-full flex-col gap-5 p-4"}
      key={"CompletedOrder"}
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <OrderSubmitComplete />
      <CurrentOrderList />
    </motion.main>
  );
}
