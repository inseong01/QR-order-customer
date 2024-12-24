'use client';

import styles from '@/style/visitor/pickUpList/PickUpListPageWrap.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import SubmitButton from '@/components/SubmitButton';
import { changeModalId } from '@/lib/features/submitState/submitSlice';
import NotCompletedOrder from './NotCompletedOrder';
import CompletedOrder from './CompletedOrder';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'motion/react';

export default function PickUpListPageWrap() {
  // useSelector
  const submitStatus = useSelector((state) => state.submitState.status);
  const currentOrderList = useSelector((state) => state.pickUpState.list);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeModalId({ target: 'orderCheck' }));
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={submitStatus !== 'OK' ? '주문표' : '주문완료'} />
      <AnimatePresence mode="popLayout">
        {submitStatus !== 'fulfilled' ? <NotCompletedOrder /> : <CompletedOrder />}
      </AnimatePresence>
      <SubmitButton
        type={submitStatus !== 'fulfilled' ? (currentOrderList.length !== 0 ? 'order' : 'back') : 'back'}
      />
    </div>
  );
}
