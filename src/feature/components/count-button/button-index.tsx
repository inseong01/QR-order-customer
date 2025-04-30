"use client";

import calculateAmount from "@/lib/function/calculateAmount";
import { useBoundStore } from "@/lib/store/useBoundStore";
import { CountButtonType, IconType } from "@/types/common";
import SimpleIcon from "../simple-icon/icon-index";

export default function CountButton({
  type,
  amount,
  id,
}: {
  type: CountButtonType;
  amount: number;
  id: number | string;
}) {
  const changeItemAmount = useBoundStore((state) => state.changeItemAmount);
  const changeSelectedMenuAmount = useBoundStore(
    (state) => state.changeSelectedMenuAmount,
  );
  const changeMenuAmountInPickUpList = useBoundStore(
    (state) => state.changeMenuAmountInPickUpList,
  );

  // 항목 수량 변경
  function onClickMenuCount(num: number) {
    return () => {
      const calcedAmount = calculateAmount(amount, num);
      // 수량 1개 이하 제한
      if (calcedAmount === amount) return;
      switch (type) {
        case "pick": {
          changeSelectedMenuAmount({ amount: calcedAmount });
          break;
        }
        case "call": {
          // overlaps 문제로 타입 단언
          const ItemId = id as number;
          changeItemAmount({ id: ItemId, amount: calcedAmount });
          break;
        }
        case "pickUpList": {
          const listId = id as string;
          changeMenuAmountInPickUpList({ id: listId, amount: calcedAmount });
          break;
        }
        default: {
          throw new Error("Type is undefined!");
        }
      }
    };
  }

  return (
    <div
      className={
        "flex h-auto cursor-default items-center rounded-sm border-[1px] border-[#e6e6e6]"
      }
    >
      <CountIconBox onClick={onClickMenuCount(-1)} type="minus" />
      <div className={"flex w-7 items-center justify-center"}>
        <span>{amount}</span>
      </div>
      <CountIconBox onClick={onClickMenuCount(1)} type="plus" />
    </div>
  );
}

function CountIconBox({
  onClick,
  type,
}: {
  onClick: () => void;
  type: IconType;
}) {
  return (
    <div
      className={"box-content h-6 w-5 cursor-pointer px-2 py-0.5"}
      onClick={onClick}
    >
      <SimpleIcon type={type} />
    </div>
  );
}
