'use client';

import styles from '@/style/visitor/bill/BillPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import OrderList from '@/components/OrderList';
import { useBoundStore } from '@/lib/store/useBoundStore';

import { useEffect } from 'react';

export default function BillPageWrap() {
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'계산서'} />
      <main className={styles.main}>
        <OrderList type={'bill'} />
      </main>
    </div>
  );
}
