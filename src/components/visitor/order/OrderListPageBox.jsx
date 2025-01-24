'use client';

import styles from '@/style/visitor/orderList/OrderListPageBox.module.css';
import OrderList from '@/components/OrderList';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function OrderListComponent({ orderListArr }) {
  return (
    <>
      {orderListArr.length === 0 ? (
        <MessageTypeComponent type={'empty'} />
      ) : (
        <NotEmptyDataComponent orderListArr={orderListArr} />
      )}
    </>
  );
}

function NotEmptyDataComponent({ orderListArr }) {
  return orderListArr.map((list, idx) => {
    return (
      <li key={idx} className={`${styles.list}`}>
        <div className={styles.top}>
          <div className={styles.title}>{orderListArr.length - idx}번째 주문</div>
          <div className={styles.line}></div>
        </div>
        <OrderList type={'AllOforderList'} listData={list.orderList} />
      </li>
    );
  });
}

function MessageTypeComponent({ type }) {
  const title = type === 'error' ? `주문 내역 오류` : '주문 내역';
  const description = type === 'error' ? `카운터에서 확인해 주세요.` : '주문 내역이 없습니다.';

  return (
    <li className={`${styles.list}`}>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <div className={styles.line}></div>
      </div>
      <div>
        <div className={styles.msg}>{description}</div>
      </div>
    </li>
  );
}

export default function OrderListPageBox() {
  // useQueryClient
  const queryClient = useQueryClient();
  const orderList = queryClient.getQueryState(['orderList']);
  // useState
  const [orderListArr, setListArr] = useState([]);
  // variant
  const isError = orderList === undefined || orderList.status === 'error';

  // 프리패치 후 최신순 정렬
  useEffect(() => {
    if (!orderList) return;
    setListArr(
      [...orderList.data[0].order].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    );
  }, [orderList]);

  return (
    <ul className={`${styles.listWrap}`}>
      {isError ? <MessageTypeComponent type={'error'} /> : <OrderListComponent orderListArr={orderListArr} />}
    </ul>
  );
}
