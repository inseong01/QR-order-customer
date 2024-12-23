'use client';

import styles from '@/style/OrderList.module.css';
import createReceipt from '@/lib/function/createReceipt';
import OrderListBox from './OrderListBox';
import getTableOrderList from '@/lib/supabase/function/getTableOrderList';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from './loading/Loading';

export default function OrderList({ type, listData = undefined }) {
  // useSelector
  const tableNum = useSelector((state) => state.userState.tableNum);
  const submitStatus = useSelector((state) => state.submitState.status);
  // useQuery
  const orderList = useQuery({
    queryKey: ['orderList', submitStatus],
    queryFn: () => getTableOrderList(tableNum),
    initialData: [],
  });
  console.log('orderList', orderList.data, 'isFetched: ', orderList.isFetched);

  // if (orderList.isFetching) return <Loading />;

  switch (type) {
    case 'AllOforderList': {
      const totalPrice = listData.reduce((prev, current) => prev + current.price * current.amount, 0);
      const totalPriceToString = totalPrice.toLocaleString();
      return (
        <div className={styles.wrap}>
          <div className={styles.top}>
            <OrderListBox listData={listData} />
          </div>
          <div className={styles.line}></div>
          <div className={styles.bottom}>
            <div className={styles.name}>결제금액</div>
            <div className={styles.price}>{totalPriceToString}원</div>
          </div>
        </div>
      );
    }
    case 'currentOrderList': {
      const totalPrice = listData.reduce((prev, current) => prev + current.price * current.amount, 0);
      const totalPriceToString = totalPrice.toLocaleString();
      return (
        <div className={styles.includeMsg}>
          <div className={styles.wrap}>
            <div className={styles.top}>
              <OrderListBox listData={listData} />
            </div>
            <div className={styles.line}></div>
            <div className={styles.bottom}>
              <div className={styles.name}>결제금액</div>
              <div className={styles.price}>{totalPriceToString}원</div>
            </div>
          </div>
          <p className={styles.msg}>
            <span>결제는 후불결제입니다.</span>
            <span>현재 앉아 계신 테이블 번호는 {tableNum}번 입니다.</span>
          </p>
        </div>
      );
    }
    case 'bill': {
      // if (!orderList.data.length) return;
      const orderListArr = orderList.data[0].order?.map((list) => list.orderList) ?? [];
      const billArr = createReceipt(orderListArr);
      const totalPrice = billArr.reduce((result, data) => result + data.price * data.amount, 0);
      const totalPriceToString = totalPrice.toLocaleString();
      return (
        <div className={styles.includeMsg}>
          <p className={styles.msg}>
            <span>결제는 후불결제입니다.</span>
            <span>현재 앉아 계신 테이블 번호는 {tableNum}번 입니다.</span>
          </p>
          <div className={styles.wrap}>
            {billArr.length === 0 ? (
              <p className={styles.msg}>
                <span className={styles.status}>주문 내역이 없습니다.</span>
              </p>
            ) : (
              <>
                <div className={styles.top}>
                  <OrderListBox listData={billArr} />
                </div>
                <div className={styles.line}></div>
                <div className={styles.bottom}>
                  <div className={styles.name}>결제금액</div>
                  <div className={styles.price}>{totalPriceToString}원</div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
  }
}
