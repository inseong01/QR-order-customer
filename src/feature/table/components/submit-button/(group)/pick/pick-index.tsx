import { useBoundStore } from "@/lib/store/useBoundStore";
import CountButton from "feature/table/components/count-button/button-index";

// Top
export function MenuCount() {
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

// Bottom
export function PickMenu() {
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
