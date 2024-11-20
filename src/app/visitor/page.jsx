'use client';

import Popup from '@/components/popup/Popup';
import InitialHeader from '@/components/visitor/InitialHeader';
import InitialMain from '@/components/visitor/InitialMain';
import { resetSubmitState } from '@/lib/features/submitState/submitSlice';
import styles from '@/style/visitor/VisitorPage.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';

function Page() {
  const isClicked = useSelector((state) => state.pickUpState.isClicked);
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const popUpType = pickUpList.length && !isClicked ? 'order' : 'pick';
  const dispatch = useDispatch();

  useEffect(() => {
    // 직원호출 초기화
    dispatch(resetSubmitState());
  }, []);

  return (
    <motion.div
      className={styles.wrap}
      style={{ height: pickUpList.length || isClicked ? 'calc(100vh + 190px)' : '100vh' }}
    >
      <InitialHeader />
      <InitialMain />
      {(pickUpList.length || isClicked) && <Popup type={popUpType} />}
    </motion.div>
  );
}

export default Page;
