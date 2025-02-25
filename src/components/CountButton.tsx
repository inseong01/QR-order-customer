'use client';

import styles from '@/style/CountButton.module.css';
import calculateAmount from '@/lib/function/calculateAmount';
import { useBoundStore } from '@/lib/store/useBoundStore';
import { CountButtonType } from '@/types/common';
import PlusMinusIcon from './SimpleIcon';

export default function CountButton({
  type,
  amount,
  id,
}: {
  type: CountButtonType;
  amount: number;
  id: number;
}) {
  const changeItemAmount = useBoundStore((state) => state.changeItemAmount);
  const changeSelectedMenuAmount = useBoundStore((state) => state.changeSelectedMenuAmount);
  const changeMenuAmountInPickUpList = useBoundStore((state) => state.changeMenuAmountInPickUpList);

  // 항목 수량 변경
  function onClickMenuCount(num: number) {
    return () => {
      const calcedAmount = calculateAmount(amount, num);
      // 수량 1개 이하 제한
      if (calcedAmount === amount) return;
      switch (type) {
        case 'pick': {
          changeSelectedMenuAmount({ amount: calcedAmount });
          break;
        }
        case 'call': {
          changeItemAmount({ id, amount: calcedAmount });
          break;
        }
        case 'pickUpList': {
          changeMenuAmountInPickUpList({ id, amount: calcedAmount });
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
        <PlusMinusIcon type={'minus'} />
      </div>
      <div className={styles.number}>
        <span>{amount}</span>
      </div>
      <div className={styles.count} onClick={onClickMenuCount(1)}>
        <PlusMinusIcon type={'plus'} />
      </div>
    </div>
  );
}
