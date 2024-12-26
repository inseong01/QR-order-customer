import styles from '@/style/SubmitButton.module.css';
import TotalPrice from './TotalPrice';
import { changeModalStatus } from '@/lib/features/submitState/submitSlice';

import { useDispatch } from 'react-redux';

export default function SubmitOrder() {
  // useDispatch
  const dispatch = useDispatch();
  // 주문하기
  function onClickSubmitOrderList() {
    dispatch(changeModalStatus({ status: true }));
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <TotalPrice />
      </div>
      <div className={styles.bottom} onClick={onClickSubmitOrderList}>
        주문하기
      </div>
    </div>
  );
}
