'use client';

import styles from '@/style/visitor/pickUpList/PickUpListPageWrap.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { useBoundStore } from '@/lib/store/useBoundStore';
import PickUpListMain from './PickUpListMain';
import PickUpListSubmit from './PickUpListSubmit';

import { useEffect } from 'react';

export default function PickUpListPageWrap() {
  const setModalType = useBoundStore((state) => state.setModalType);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setModalType({ type: 'orderCheck' });
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'주문'} />
      <PickUpListMain />
      <PickUpListSubmit />
    </div>
  );
}
