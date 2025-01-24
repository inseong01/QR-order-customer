'use client';

import styles from '@/style/visitor/pickUpList/PickUpListPageWrap.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { useBoundStore } from '@/lib/store/useBoundStore';
import PickUpListMain from './PickUpListMain';
import PickUpListSubmit from './PickUpListSubmit';

import { useEffect } from 'react';

function HeaderComponent() {
  const submitStatus = useBoundStore((state) => state.submitState.status);
  return <AppVisitorHeader title={submitStatus !== 'fulfilled' ? '주문표' : '주문완료'} />;
}

export default function PickUpListPageWrap() {
  const setModalType = useBoundStore((state) => state.setModalType);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setModalType({ type: 'orderCheck' });
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={styles.wrap}>
      <HeaderComponent />
      <PickUpListMain />
      <PickUpListSubmit />
    </div>
  );
}
