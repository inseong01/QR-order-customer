import styles from '@/style/submitButton/TotalPrice.module.css';

import { useSelector } from 'react-redux';

export default function TotalPrice() {
  // useSelector
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const totalPrice = pickUpList.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <div className={styles.totalPrice}>
      <div className={styles.title}>합계</div>
      <div className={styles.price}>{totalPriceToString}원</div>
    </div>
  );
}
