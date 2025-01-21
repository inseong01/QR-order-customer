'use client';

import styles from '@/style/alertModal/AlertModal.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

import { motion } from 'motion/react';
import Link from 'next/link';

export default function AlertModal({ type }) {
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const isOpenModal = useBoundStore((state) => state.modalState.isOpen);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const resetCallState = useBoundStore((state) => state.resetCallState);
  const fetchOrderSubmitState = useBoundStore((state) => state.fetchOrderSubmitState);

  // db 제출 거부, '아니요'
  function onClickNotEnsureSubmit() {
    setModalOpen({ isOpen: false });
  }

  // db 제출 허용, '예'
  function onClickEnsureSubmit() {
    if (isSubmit) return;
    switch (type) {
      case 'orderCheck': {
        fetchOrderSubmitState({ tableNum, pickUpList });
        setModalOpen({ isOpen: false });
        break;
      }
      case 'request': {
        resetCallState(); // 초기화
        break;
      }
    }
  }

  switch (type) {
    case 'orderCheck': {
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
              <span className={styles.title} onClick={onClickNotEnsureSubmit}>
                아니요
              </span>
              <span className={styles.title} onClick={onClickEnsureSubmit}>
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
    case 'request': {
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
            <div className={styles.top}>요청되었습니다</div>
            <Link
              href={`/${tableNum}`}
              replace={true}
              className={styles.bottom}
              onClick={onClickEnsureSubmit}
            >
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
  }
}
