'use client';

import styles from '@/style/visitor/pickUpList/PickUpListPageWrap.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { changeModalId } from '@/lib/features/submitState/submitSlice';
import PickUpListMain from './PickUpListMain';
import PickUpListSubmit from './PickUpListSubmit';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PickUpListPageWrap() {
  // useSelector
  const submitStatus = useSelector((state) => state.submitState.status);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeModalId({ target: 'orderCheck' }));
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={submitStatus !== 'OK' ? '주문표' : '주문완료'} />
      <PickUpListMain />
      <PickUpListSubmit />
    </div>
  );
}
