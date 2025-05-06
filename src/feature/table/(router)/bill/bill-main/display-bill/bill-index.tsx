import { calculateTotalPrice } from "@/lib/function/(router)/calculateTotalPrice";
import createReceipt from "@/lib/function/display-bill/create-receipt";
import { OrderListType } from "@/types/common";
import Divider from "feature/table/(router)/components/line/line-index";
import MenuList from "feature/table/(router)/components/main/display/menu-list/list-index";
import DisplayTotalPrice from "feature/table/(router)/components/main/display/total-price/price-index";
import VerticalStackGroup from "feature/table/(router)/components/vertical-stack/stack-index";

export default function Bill({
  orderListArr,
}: {
  orderListArr: OrderListType[][];
}) {
  const billArr = createReceipt(orderListArr);
  const totalPrice = billArr.reduce(calculateTotalPrice, 0);
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <>
      <VerticalStackGroup tag="div" gap="gap-5">
        <MenuList listData={billArr} />
      </VerticalStackGroup>
      <Divider />
      <DisplayTotalPrice title="결제금액" price={totalPriceToString} />
    </>
  );
}
