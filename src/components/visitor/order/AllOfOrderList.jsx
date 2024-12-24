import styles from '@/style/OrderList.module.css';
import OrderListBox from './OrderListBox';

export default function AllOfOrderList({ listData }) {
  const totalPrice = listData.reduce((prev, current) => prev + current.price * current.amount, 0);
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <OrderListBox listData={listData} />
      </div>
      <div className={styles.line}></div>
      <div className={styles.bottom}>
        <div className={styles.name}>결제금액</div>
        <div className={styles.price}>{totalPriceToString}원</div>
      </div>
    </div>
  );
}
