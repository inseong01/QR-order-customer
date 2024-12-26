'use client';

import styles from '@/style/CountButton.module.css';
import { changeItemAmount } from '@/lib/features/callState/callSlice';

import { useDispatch } from 'react-redux';
import calculateAmount from '@/lib/function/calculateAmount';
import { changeAmountInPickUpList, changeSelectedMenuAmount } from '@/lib/features/pickUpState/pickUpSlice';

export default function CountButton({ type, amount, id }) {
  // dispatch
  const dispatch = useDispatch();

  function onClickMenuCount(num) {
    return () => {
      const calcedAmount = calculateAmount(amount, num);
      // 수량 1개 이하 제한
      if (calcedAmount === amount) return;
      switch (type) {
        case 'pick': {
          dispatch(changeSelectedMenuAmount({ amount: calcedAmount }));
          break;
        }
        case 'call': {
          dispatch(changeItemAmount({ id, amount: calcedAmount }));
          break;
        }
        case 'pickUpList': {
          dispatch(changeAmountInPickUpList({ id, amount: calcedAmount }));
          break;
        }
        default: {
          throw new Error('Type is undefined!');
        }
      }
    };
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
