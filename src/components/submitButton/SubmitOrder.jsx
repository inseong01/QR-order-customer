import styles from '@/style/SubmitButton.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import TotalPrice from './TotalPrice';

export default function SubmitOrder() {
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  // 주문하기
  function onClickSubmitOrderList() {
    setModalOpen({ isOpen: true });
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
