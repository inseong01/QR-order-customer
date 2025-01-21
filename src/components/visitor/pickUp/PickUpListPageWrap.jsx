'use client';

import styles from '@/style/visitor/pickUpList/PickUpListPageWrap.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { useBoundStore } from '@/lib/store/useBoundStore';
import PickUpListMain from './PickUpListMain';
import PickUpListSubmit from './PickUpListSubmit';

import { useEffect } from 'react';

function AppVisitorHeaderBox() {
  const submitStatus = useBoundStore((state) => state.submitState.status);
  return <AppVisitorHeader title={submitStatus !== 'fulfilled' ? '주문표' : '주문완료'} />;
}

export default function PickUpListPageWrap() {
  const setModalType = useBoundStore((state) => state.setModalType);

  useEffect(() => {
    setModalType({ type: 'orderCheck' });
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeaderBox />
      <PickUpListMain />
      <PickUpListSubmit />
    </div>
  );
}
