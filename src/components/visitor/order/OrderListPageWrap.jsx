'use client';

import styles from '@/style/visitor/orderList/OrderListPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { useBoundStore } from '@/lib/store/useBoundStore';
import OrderListPageBox from './OrderListPageBox';

import { useEffect } from 'react';

export default function OrderListPageWrap() {
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'주문내역'} />
      <main className={styles.main}>
        <OrderListPageBox />
      </main>
    </div>
  );
}
