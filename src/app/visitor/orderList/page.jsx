'use client';

import styles from '@/style/visitor/orderList/OrderListPage.module.css';
import OrderList from '@/components/OrderList';
import AppVisitorHeader from '@/components/AppVisitorHeader';

import { useSelector } from 'react-redux';

export default function OrderListPage() {
  // useSelector
  const orderList = useSelector((state) => state.orderListState.list);

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
              {orderList.map((list, idx) => {
                return (
                  <li key={idx} className={`${styles.list}`}>
                    <div className={styles.top}>
                      <div className={styles.title}>{orderList.length - idx}번째 주문</div>
                      <div className={styles.line}></div>
                    </div>
                    <OrderList type={'AllOforderList'} listData={list} />
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
