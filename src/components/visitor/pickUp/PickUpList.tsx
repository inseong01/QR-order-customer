import styles from "@/style/visitor/pickUpList/PickUpList.module.css";
import CountButton from "@/components/CountButton";
import { OrderListType } from "@/types/common";

export default function PickUpList({
  currentOrderList,
  onClickDeleteList,
}: {
  currentOrderList: OrderListType[];
  onClickDeleteList: (id: string) => () => void;
}) {
  return (
    <>
      {currentOrderList.map((list, idx) => {
        const { name, price, amount, id } = list;
        const priceToString = price.toLocaleString();
        return (
          <li key={idx} className={"flex w-full flex-col gap-5"}>
            <div className={"flex flex-col gap-2.5"}>
              <div className={"flex w-full items-center justify-between"}>
                <span>{name}</span>
                <span>{priceToString}원</span>
              </div>
              <div className={"flex w-full items-center justify-between"}>
                <div
                  className={
                    "cursor-pointer rounded-sm border-[1px] border-[#c9c9c9] px-3 py-1 text-xs leading-5 text-[#959595]"
                  }
                  onClick={onClickDeleteList(id)}
                >
                  빼기
                </div>
                <CountButton type={"pickUpList"} amount={amount} id={id} />
              </div>
            </div>
            <span id="line" className={"h-[1px] bg-[#d9d9d9]"}></span>
          </li>
        );
      })}
    </>
  );
}
