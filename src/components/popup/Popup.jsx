'use client';

import styles from '@/style/popup/Popup.module.css';
import CountButton from '../CountButton';
import { pickUpMenu } from '@/lib/features/requestState/pickUpSlice';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function Popup({ type }) {
  // useSelector
  const selectedMenu = useSelector((state) => state.pickUpState.selectedMenu);
  const selectedMenuAmount = useSelector((state) => state.pickUpState.selectedMenu.amount);
  const tableNum = useSelector((state) => state.userState.tableNum);
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const router = useRouter();

  // 항목 선택
  function onClickList() {
    dispatch(pickUpMenu());
  }

  // 주문표 확인하기
  function onClickCheckPickUpList() {
    router.push(`${tableNum}/pickUpList`);
  }

  switch (type) {
    case 'pick': {
      return (
        <motion.div
          className={styles.wrap}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ ease: 'easeOut' }}
        >
          <div className={styles.top}>
            <div className={styles.title}>
              <span className={styles.context}>{selectedMenu.name}</span>
            </div>
            <CountButton amount={selectedMenuAmount} />
          </div>
          <div className={styles.bottom} onClick={onClickList}>
            <span className={styles.context}>음식 담기</span>
          </div>
        </motion.div>
      );
    }
    case 'order': {
      return (
        <motion.div
          className={styles.wrap}
          onClick={onClickCheckPickUpList}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ ease: 'easeOut' }}
        >
          <div className={styles.bottom}>
            <span className={styles.context}>주문표 확인하기</span>
          </div>
        </motion.div>
      );
    }
  }
}
