import styles from '@/style/SubmitButton.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import TotalPrice from './TotalPrice';

import { useEffect, useState } from 'react';

export default function SubmitOrder() {
  // store
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  // useState
  const [isClickAble, setClickAble] = useState(false);

  // 클릭 지연, orderListQueryOption 에러 확인 목적
  useEffect(() => {
    const timer = setTimeout(() => {
      setClickAble(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 주문하기
  function onClickSubmitOrderList() {
    if (!isClickAble) return;
    setModalOpen({ isOpen: true });
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <TotalPrice />
      </div>
      <div className={`${styles.bottom} ${isClickAble ? '' : styles.able}`} onClick={onClickSubmitOrderList}>
        주문하기
      </div>
    </div>
  );
}
