'use client';

import styles from '@/style/visitor/InitialClientPage.module.css';
import Popup from '@/components/popup/Popup';
import InitialHeader from '@/components/visitor/InitialHeader';
import InitialMain from '@/components/visitor/InitialMain';
import { resetSubmitState } from '@/lib/features/submitState/submitSlice';
import { setTableNum } from '@/lib/features/userState/userSlice';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

function InitialClientPage() {
  // useSelector
  const isClicked = useSelector((state) => state.pickUpState.isClicked);
  const pickUpList = useSelector((state) => state.pickUpState.list);
  // variant
  const popUpType = pickUpList.length && !isClicked ? 'order' : 'pick';
  // dispatch
  const dispatch = useDispatch();
  // usePathname
  const pathName = usePathname();

  useEffect(() => {
    // 직원호출 초기화
    dispatch(resetSubmitState());

    // 고유 테이블 숫자 할당
    const tableNum = Number(pathName.replace('/', ''));
    dispatch(setTableNum({ tableNum }));
  }, []);

  return (
    <motion.div
      className={styles.wrap}
      style={{ height: pickUpList.length || isClicked ? 'calc(100vh + 190px)' : '100vh' }}
    >
      <InitialHeader />
      <InitialMain />
      <AnimatePresence>
        {(pickUpList.length || isClicked) && <Popup type={popUpType} key={'popUp'} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default InitialClientPage;
