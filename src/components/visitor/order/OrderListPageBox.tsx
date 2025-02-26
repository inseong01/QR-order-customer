'use client';

import styles from '@/style/visitor/orderList/OrderListPageBox.module.css';
import { orderListQueryOption } from '@/lib/function/useQuery/queryOption';
import { useBoundStore } from '@/lib/store/useBoundStore';
import { MsgType, TableList } from '@/types/common';
import OrderList from '@/components/OrderList';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function OrderListComponent({ orderListArr }: { orderListArr: TableList['order'] }) {
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

function NotEmptyDataComponent({ orderListArr }: { orderListArr: TableList['order'] }) {
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

function MessageTypeComponent({ type }: { type: MsgType }) {
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
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  // useQueryClient
  const queryClient = useQueryClient();
  const orderList = queryClient.getQueryState(orderListQueryOption(tableName).queryKey);
  // useState
  const [orderListArr, setListArr] = useState<TableList['order']>([]);
  // variant
  const isError = !orderList || orderList.status === 'error';

  // 프리패치 후 최신순 정렬
  useEffect(() => {
    if (!orderList?.data) return;
    const tableData = orderList.data[0];
    const copiedOrderData = [...tableData.order].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setListArr(copiedOrderData);
  }, [orderList]);

  return (
    <ul className={`${styles.listWrap}`}>
      {isError ? <MessageTypeComponent type={'error'} /> : <OrderListComponent orderListArr={orderListArr} />}
    </ul>
  );
}
