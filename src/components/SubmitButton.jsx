'use client';

import styles from '@/style/SubmitButton.module.css';
import { changeModalStatus, fetchRequestListResponse } from '@/lib/features/submitState/submitSlice';
import { resetPickUpState } from '@/lib/features/pickUpState/pickUpSlice';
import makeSentence from '@/lib/function/makeSentence';
import PickAndCountButton from './submitButton/PickAndCountButton';
import TotalPrice from './submitButton/TotalPrice';

import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function SubmitButton({ type }) {
  // useSelector
  const requestList = useSelector((state) => state.callState.selectedItemArr);
  const tableNum = useSelector((state) => state.userState.tableNum);
  // dispatch
  const dispatch = useDispatch();

  // 돌아가기
  async function onClickReturnHome() {
    dispatch(resetPickUpState()); // 초기화
  }
  // 주문하기
  function onClickSubmitOrderList() {
    dispatch(changeModalStatus({ status: true }));
  }
  // 호출하기
  function onClickSubmitRequestList() {
    // 알림으로 requestList(요청) 전달
    const requestStr = makeSentence(requestList);
    dispatch(fetchRequestListResponse({ tableNum, requestStr }));
  }

  switch (type) {
    case 'back': {
      return (
        <div className={styles.wrap} onClick={onClickReturnHome}>
          <Link href={`/${tableNum}`} replace={true} className={styles.bottom}>
            돌아가기
          </Link>
        </div>
      );
    }
    case 'order': {
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
    case 'request': {
      return (
        <motion.div
          className={styles.wrap}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ bounce: 0, ease: 'easeOut' }}
        >
          <div className={styles.top}>
            <PickAndCountButton />
          </div>
          <div className={styles.bottom} onClick={onClickSubmitRequestList}>
            요청하기
          </div>
        </motion.div>
      );
    }
  }
}
