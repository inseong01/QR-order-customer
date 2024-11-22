'use client';

import styles from '@/style/visitor/InitialClientPage.module.css';
import Popup from '@/components/popup/Popup';
import InitialHeader from '@/components/visitor/InitialHeader';
import InitialMain from '@/components/visitor/InitialMain';
import { resetSubmitState } from '@/lib/features/submitState/submitSlice';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QueryClient, useQuery } from '@tanstack/react-query';
import fetchMenuData from '@/function/firebase/fetchMenuData';

function InitialClientPage() {
  // useSelector
  const isClicked = useSelector((state) => state.pickUpState.isClicked);
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const popUpType = pickUpList.length && !isClicked ? 'order' : 'pick';
  const tableNum = useSelector((state) => state.userState.tableNum);
  // dispatch
  const dispatch = useDispatch();
  // useQuery
  const { data } = useQuery({
    queryKey: ['orderList'],
    queryFn: () => fetchMenuData(`table/${tableNum}/orderList`),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    // 직원호출 초기화
    dispatch(resetSubmitState());
  }, []);

  useEffect(() => {
    if (!data) return;
    const orderListData = data ? data : null;
    localStorage.setItem('orderList', JSON.stringify(orderListData));
  }, [data]);

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
