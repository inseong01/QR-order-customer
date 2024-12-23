'use client';

import styles from '@/style/visitor/orderList/OrderListPage.module.css';
import OrderList from '@/components/OrderList';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import getTableOrderList from '@/lib/supabase/function/getTableOrderList';

export default function OrderListPage() {
  // const orderList = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('orderList')) || [] : [];

  // useEffect(() => {
  //   if (typeof window !== 'undefined') return;
  // }, []);

  // useSelector
  const tableNum = useSelector((state) => state.userState.tableNum);
  const submitStatus = useSelector((state) => state.submitState.status);
  // useQuery
  const orderList = useQuery({
    queryKey: ['orderList', submitStatus],
    queryFn: () => getTableOrderList(tableNum),
    initialData: [],
    // staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!orderList.data) return;
  }, [orderList.data]);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'주문내역'} />
      <main className={styles.main}>
        <ul className={`${styles.listWrap}`}>
          {orderList.data.length < 1 ? (
            <li className={`${styles.list}`}>
              <div className={styles.top}>
                <div className={styles.title}>주문 내역이 없습니다.</div>
                <div className={styles.line}></div>
              </div>
            </li>
          ) : (
            <>
              {orderList.data[0].order
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((list, idx) => {
                  return (
                    <li key={idx} className={`${styles.list}`}>
                      <div className={styles.top}>
                        <div className={styles.title}>{orderList.data.length - idx}번째 주문</div>
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
