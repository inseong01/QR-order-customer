import styles from '@/style/alertModal/AlertModal.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

import { motion } from 'motion/react';

export default function OrderCheckDialog({
  onClickNotEnsure,
  onClickEnsure,
}: {
  onClickNotEnsure: () => void;
  onClickEnsure: () => void;
}) {
  const isOpenModal = useBoundStore((state) => state.modalState.isOpen);

  return (
    <>
      <motion.dialog
        id="orderCheck"
        className={styles.wrap}
        open={isOpenModal}
        style={{ translateX: '-50%', translateY: '-50%' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.3 }}
      >
        <div className={styles.top}>주문하시겠습니까?</div>
        <div className={styles.bottom}>
          <span className={styles.title} onClick={onClickNotEnsure}>
            아니요
          </span>
          <span className={styles.title} onClick={onClickEnsure}>
            예
          </span>
        </div>
      </motion.dialog>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </>
  );
}
