import styles from "@/style/OrderSubmitComplete.module.css";
import { useBoundStore } from "@/lib/store/useBoundStore";
import { orderListQueryOption } from "@/lib/function/useQuery/queryOption";

import { useQueryClient } from "@tanstack/react-query";

export default function OrderSubmitComplete() {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  // useQueryClient
  const query = useQueryClient();
  const queryState = query.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );
  // variant
  const isOk = submitStatus === "fulfilled" && queryState?.status === "success";
  const status = isOk ? "ok" : "fail";
  const result = isOk ? "완료" : "실패";
  const description = isOk
    ? "정상적으로 접수되었어요, 조금만 기다려주세요!"
    : "정상적으로 접수되지 않았어요, 직원을 호출해주세요!";

  return (
    <div
      className={
        "flex w-full flex-col items-center justify-center gap-2.5 p-10"
      }
    >
      <h1 className="text-3xl font-bold">
        주문이 <span className={styles[status]}>{result}</span>되었어요
      </h1>
      <p className={"text-xs text-[#959595]"}>{description}</p>
    </div>
  );
}
