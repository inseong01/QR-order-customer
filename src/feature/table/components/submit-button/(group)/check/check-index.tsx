import { useBoundStore } from "@/lib/store/use-bound-store";

import { useRouter } from "next/navigation";

// Bottom
export function CheckMenu() {
  const isClicked = useBoundStore((state) => state.flagState.isClicked);
  const setFlag = useBoundStore((state) => state.setFlag);
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const router = useRouter();

  // 주문표 확인하기
  function onClickCheckPickUpList() {
    if (isClicked) return;
    setFlag({ isClicked: true });
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
