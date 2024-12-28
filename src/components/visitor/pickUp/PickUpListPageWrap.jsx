'use client';

import styles from '@/style/visitor/pickUpList/PickUpListPageWrap.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { changeModalId } from '@/lib/features/submitState/submitSlice';
import PickUpListMain from './PickUpListMain';
import PickUpListSubmit from './PickUpListSubmit';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AppVisitorHeaderBox() {
  // useSelector
  const submitStatus = useSelector((state) => state.submitState.status);
  return <AppVisitorHeader title={submitStatus !== 'fulfilled' ? '주문표' : '주문완료'} />;
}

export default function PickUpListPageWrap() {
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeModalId({ target: 'orderCheck' }));
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeaderBox />
      <PickUpListMain />
      <PickUpListSubmit />
    </div>
  );
}
