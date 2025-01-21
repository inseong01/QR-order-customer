'use client';

import styles from '@/style/visitor/orderList/OrderListPage.module.css';
import getTableOrderList from '@/lib/supabase/function/getTableOrderList';
import { useBoundStore } from '@/lib/store/useBoundStore';
import OrderList from '@/components/OrderList';

import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function OrderListPageBox() {
  // store
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  // useQuery
  const { data } = useSuspenseQuery({
    queryKey: ['orderList'],
    queryFn: () => getTableOrderList(tableNum),
    staleTime: 1000 * 1,
  });
  // useState
  const [orderListArr, setListArr] = useState([]);

  useEffect(() => {
    console.log('data', data);
    if (!data) return;

    setListArr(
      [...data[0].order].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    );
  }, [data]);

  return (
    <ul className={`${styles.listWrap}`}>
      {!orderListArr.length ? (
        <li className={`${styles.list}`}>
          <div className={styles.top}>
            <div className={styles.title}>주문 내역이 없습니다.</div>
            <div className={styles.line}></div>
          </div>
        </li>
      ) : (
        <>
          {orderListArr.map((list, idx) => {
            return (
              <li key={idx} className={`${styles.list}`}>
                <div className={styles.top}>
                  <div className={styles.title}>{data[0].order.length - idx}번째 주문</div>
                  <div className={styles.line}></div>
                </div>
                <OrderList type={'AllOforderList'} listData={list.orderList} />
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
}
