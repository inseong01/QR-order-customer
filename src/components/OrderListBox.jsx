'use client';

import styles from '@/style/OrderListBox.module.css';

export default function OrderListBox({ listData }) {
  return (
    <ul className={styles.listBox}>
      {listData.map((menu, idx) => {
        const { name, amount, price } = menu;
        const priceToString = price.toLocaleString();
        return (
          <li key={idx} className={styles.list}>
            <div className={styles.menuBox}>
              <div className={styles.name}>{name}</div>
              <div className={styles.amount}>x {amount}</div>
            </div>
            <div className={styles.price}>{priceToString}원</div>
          </li>
        );
      })}
    </ul>
  );
}
