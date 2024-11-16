'use client';

import { countNumber } from '@/lib/features/countNumberState/countNumberSlice';
import styles from '@/style/CountButton.module.css';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function CountButton({ amount = undefined, idx = undefined, countFunction = undefined }) {
  const number = useSelector((state) => state.countNumberState.currentNum);
  const pathName = usePathname();
  const dispatch = useDispatch();

  function onClickMenuCount(num) {
    if (pathName === '/visitor') {
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
        <span className={styles.context}>{amount ?? number}</span>
      </div>
      <div className={styles.count} onClick={onClickMenuCount(1)}>
        <span className={styles.context}>+</span>
      </div>
    </div>
  );
}
