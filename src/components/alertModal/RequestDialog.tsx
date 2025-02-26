import { useBoundStore } from '@/lib/store/useBoundStore';
import styles from '@/style/alertModal/AlertModal.module.css';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function RequestDialog({ onClickEnsureSubmit }: { onClickEnsureSubmit: () => void }) {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const isOpenModal = useBoundStore((state) => state.modalState.isOpen);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  // variant
  const title = submitStatus === 'fulfilled' ? '요청되었습니다' : '요청되지 않았습니다';

  return (
    <>
      <motion.dialog
        id="request"
        className={styles.wrap}
        open={isOpenModal}
        style={{ translateX: '-50%', translateY: '-50%' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.3 }}
      >
        <div className={styles.top}>{title}</div>
        <Link href={`/${tableName}`} replace={true} className={styles.bottom} onClick={onClickEnsureSubmit}>
          <span className={`${styles.title} ${styles.last}`}>확인</span>
        </Link>
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
