import styles from "@/style/OrderListBox.module.css";
import { OrderListType } from "@/types/common";

export default function OrderListBox({
  listData,
}: {
  listData?: OrderListType[];
}) {
  return (
    <ul className={styles.listBox}>
      {listData?.map((menu, idx) => {
        const { name, amount, price } = menu;
        const priceToString = price.toLocaleString();
        return (
          <li key={idx} className={styles.list}>
            <div className={styles.menuBox}>
              <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.priceBox}>
              <div className={styles.amount}>{amount}</div>x
              <div className={styles.price}>{priceToString}원</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

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
            <div
              className={
                "flex min-w-30 items-center justify-end gap-2.5 text-right"
              }
            >
              <span>{amount}</span>x<span>{priceToString}원</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
