'use client';

import styles from '@/style/visitor/orderList/OrderListPage.module.css';
import OrderList from '@/components/OrderList';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { useEffect } from 'react';

export default function OrderListPage() {
  const orderList = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('orderList')) || [] : [];

  useEffect(() => {
    if (typeof window !== 'undefined') return;
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'주문내역'} />
      <main className={styles.main}>
        <ul className={`${styles.listWrap}`}>
          {orderList.length === 0 ? (
            <li className={`${styles.list}`}>
              <div className={styles.top}>
                <div className={styles.title}>주문 내역이 없습니다.</div>
                <div className={styles.line}></div>
              </div>
            </li>
          ) : (
            <>
              {orderList
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((list, idx) => {
                  return (
                    <li key={idx} className={`${styles.list}`}>
                      <div className={styles.top}>
                        <div className={styles.title}>{orderList.length - idx}번째 주문</div>
                        <div className={styles.line}></div>
                      </div>
                      <OrderList type={'AllOforderList'} listData={list.orderList} />
                    </li>
                  );
                })}
            </>
          )}
        </ul>
      </main>
    </div>
  );
}
