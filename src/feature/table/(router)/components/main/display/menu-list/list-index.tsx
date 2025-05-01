import { OrderListType } from "@/types/common";
import VerticalStackGroup from "../../../vertical-stack/stack-index";
import Item from "./list-item";

export default function MenuList({ listData }: { listData: OrderListType[] }) {
  return (
    <VerticalStackGroup tag="ul" gap="gap-5">
      {listData.map((menu, idx) => {
        const { name, amount, price } = menu;
        const priceToString = price.toLocaleString();
        return (
          <Item key={idx} name={name} amount={amount} price={priceToString} />
        );
      })}
    </VerticalStackGroup>
  );
}
