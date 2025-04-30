import createReceipt from "@/lib/function/createReceipt";
import { MsgType, OrderListType } from "@/types/common";

export default function Bill({
  orderListArr,
}: {
  orderListArr: OrderListType[][];
}) {
  const billArr = createReceipt(orderListArr);
  const totalPrice = billArr.reduce(
    (result, data) => result + data.price * data.amount,
    0,
  );
  const totalPriceToString = totalPrice.toLocaleString();

  if (orderListArr.length === 0) return <ExceptionMessage type={"empty"} />;

  return (
    <>
      <div className={"flex h-auto w-full flex-col gap-5"}>
        <MenuList listData={billArr} />
      </div>
      <span
        id="line"
        className={"h-[1px] w-full border-[1px] border-[#c9c9c9]"}
      ></span>
      <MenuTotalPrice price={totalPriceToString} />
    </>
  );
}

function MenuTotalPrice({ price }: { price: string }) {
  return (
    <div className={"flex w-full justify-between"}>
      <span>결제금액</span>
      <span>{price}원</span>
    </div>
  );
}

// 모듈화
function MenuList({ listData }: { listData?: OrderListType[] }) {
  return (
    <ul className={"flex flex-col gap-4"}>
      {listData?.map((menu, idx) => {
        const { name, amount, price } = menu;
        const priceToString = price.toLocaleString();
        return (
          <li key={idx} className={"flex w-full items-center justify-between"}>
            <div>
              <span>{name}</span>
            </div>
            <div className={"flex items-center justify-end gap-2.5 text-right"}>
              <span>{amount}</span>x
              <span className="min-w-23">{priceToString}원</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ExceptionMessage({ type }: { type: MsgType }) {
  const isError = type === "error";
  const description = isError
    ? "목록을 불러오는 데 오류가 발생했습니다. 카운터에서 확인해 주세요."
    : "주문 내역이 없습니다.";
  return (
    <div>
      <p className={"text-xs text-[#959595]"}>{description}</p>
    </div>
  );
}
