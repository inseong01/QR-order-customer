'use client';

import styles from '@/style/visitor/InitialClientPage.module.css';
import Popup from '@/components/popup/Popup';
import InitialHeader from '@/components/visitor/InitialHeader';
import InitialMain from '@/components/visitor/InitialMain';
import { resetSubmitState } from '@/lib/features/submitState/submitSlice';

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function InitialClientPage() {
  // useSelector
  const isClicked = useSelector((state) => state.pickUpState.isClicked);
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const popUpType = pickUpList.length && !isClicked ? 'order' : 'pick';
  // dispatch
  const dispatch = useDispatch();
  // Query
  const queryClient = new QueryClient();

  useEffect(() => {
    // 직원호출 초기화
    dispatch(resetSubmitState());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <motion.div
        className={styles.wrap}
        style={{ height: pickUpList.length || isClicked ? 'calc(100vh + 190px)' : '100vh' }}
      >
        <InitialHeader />
        <InitialMain />
        {(pickUpList.length || isClicked) && <Popup type={popUpType} />}
      </motion.div>
    </QueryClientProvider>
  );
}

export default InitialClientPage;
