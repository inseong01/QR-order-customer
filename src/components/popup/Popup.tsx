'use client';

import styles from '@/style/popup/Popup.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import CountButton from '../CountButton';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function Popup() {
  // store
  const isRequestClicked = useBoundStore((state) => state.requestState.isClicked);
  const selectedMenu = useBoundStore((state) => state.pickUpState.selectedMenu);
  const selectedMenuID = useBoundStore((state) => state.pickUpState.selectedMenu.id);
  const selectedMenuAmount = useBoundStore((state) => state.pickUpState.selectedMenu.amount);
  const pickUpIsClicked = useBoundStore((state) => state.pickUpState.isClicked);
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const pickUpSelectedMenu = useBoundStore((state) => state.pickUpSelectedMenu);
  // variant
  const shoppingcartEnable = !!pickUpList.length;
  const popUpType = pickUpIsClicked || !shoppingcartEnable ? 'pick' : 'order';
  // useRouter
  const router = useRouter();

  // 항목 선택
  function onClickBottom() {
    pickUpSelectedMenu();
  }

  // 주문표 확인하기
  function onClickCheckPickUpList() {
    if (isRequestClicked) return;
    setRequestClick({ isClicked: true });
    router.push(`${tableName}/pickUpList`);
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
          <div className={styles.bottom} onClick={onClickBottom}>
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
