'use client';

import { calculateMenuAmounts } from '@/lib/features/requestState/requestSlice';
import styles from '@/style/CountButton.module.css';
import { useDispatch, useSelector } from 'react-redux';

export default function CountButton() {
  const count = useSelector((state) => state.requestState.pickUp.selectedMenu.count);
  const dispatch = useDispatch();

  function onClickMenuCount(num) {
    return () => {
      dispatch(calculateMenuAmounts({ num }));
    };
  }
  return (
    <div className={styles.btnWrap}>
      <div className={styles.count} onClick={onClickMenuCount(-1)}>
        <span className={styles.context}>-</span>
      </div>
      <div className={styles.number}>
        <span className={styles.context}>{count}</span>
      </div>
      <div className={styles.count} onClick={onClickMenuCount(1)}>
        <span className={styles.context}>+</span>
      </div>
    </div>
  );
}
