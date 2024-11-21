'use client';

import styles from '@/style/CountButton.module.css';
import { countNumber } from '@/lib/features/countNumberState/countNumberSlice';

import { useDispatch } from 'react-redux';

export default function CountButton({ amount, idx = undefined, countFunction = undefined }) {
  // dispatch
  const dispatch = useDispatch();

  function onClickMenuCount(num) {
    if (!countFunction) {
      return () => {
        dispatch(countNumber({ num }));
      };
    } else {
      return () => {
        dispatch(countFunction({ num, idx }));
      };
    }
  }
  return (
    <div className={styles.btnWrap}>
      <div className={styles.count} onClick={onClickMenuCount(-1)}>
        <span className={styles.context}>-</span>
      </div>
      <div className={styles.number}>
        <span className={styles.context}>{amount}</span>
      </div>
      <div className={styles.count} onClick={onClickMenuCount(1)}>
        <span className={styles.context}>+</span>
      </div>
    </div>
  );
}
