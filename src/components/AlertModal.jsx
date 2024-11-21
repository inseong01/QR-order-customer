'use client';

import styles from '@/style/AlertModal.module.css';
import { addOrderList } from '@/lib/features/requestState/orderListSlice';
import { asyncFetchOrderList, changeModalStatus } from '@/lib/features/submitState/submitSlice';

import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function AlertModal({ type }) {
  // useSelector
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const modalStatus = useSelector((state) => state.submitState.modal.status);
  // dispatch
  const dispatch = useDispatch();

  function onClickNotEnsureSubmit() {
    dispatch(changeModalStatus({ status: false }));
  }

  function onClickEnsureSubmit() {
    if (isSubmit) return;
    dispatch(addOrderList({ list: pickUpList }));
    dispatch(asyncFetchOrderList(pickUpList));
    dispatch(changeModalStatus({ status: false }));
  }

  switch (type) {
    case 'orderCheck': {
      return (
        <>
          <motion.dialog
            id="orderCheck"
            className={styles.wrap}
            open={modalStatus}
            style={{ translateX: '-50%', translateY: '-50%' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
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
            open={modalStatus}
            style={{ translateX: '-50%', translateY: '-50%' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            <div className={styles.top}>요청되었습니다</div>
            <Link href={'/visitor'} replace={true} className={styles.bottom}>
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
    case 'empty': {
      return (
        <div id="empty" className={`${styles.wrap} ${styles.error}`}>
          <span className={styles.msg}>항목을 골라주세요</span>
        </div>
      );
    }
  }
}
