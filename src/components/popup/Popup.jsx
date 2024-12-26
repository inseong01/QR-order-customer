'use client';

import styles from '@/style/popup/Popup.module.css';
import CountButton from '../CountButton';
import { pickUpMenu } from '@/lib/features/pickUpState/pickUpSlice';
import { setRequestClick } from '@/lib/features/requestState/requestSlice';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function Popup() {
  // useSelector
  const selectedMenu = useSelector((state) => state.pickUpState.selectedMenu);
  const selectedMenuID = useSelector((state) => state.pickUpState.selectedMenu.id);
  const selectedMenuAmount = useSelector((state) => state.pickUpState.selectedMenu.amount);
  const pickUpIsClicked = useSelector((state) => state.pickUpState.isClicked);
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const currentSelectedMenu = useSelector((state) => state.pickUpState.selectedMenu);
  const tableNum = useSelector((state) => state.userState.tableNum);
  const isRequestClicked = useSelector((state) => state.requestState.isClicked);
  // variant
  const alreadySelected = pickUpList.some((list) => list.id === currentSelectedMenu.id);
  const popUpType = !pickUpIsClicked || alreadySelected ? 'order' : 'pick';
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
    if (isRequestClicked) return;
    dispatch(setRequestClick({ isClicked: true }));
    router.push(`${tableNum}/pickUpList`);
  }

  switch (popUpType) {
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
            <CountButton type={popUpType} amount={selectedMenuAmount} id={selectedMenuID} />
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
