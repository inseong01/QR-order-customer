'use client';

import createReceipt from '@/function/createReceipt';
import styles from '@/style/OrderList.module.css';
import { useSelector } from 'react-redux';
import OrderListBox from './OrderListBox';

export default function OrderList({ type, listData = undefined }) {
  // type을 받아서 type 조건에 맞는 dispatch 실행, menuList 받아옴
  const orderList = useSelector((state) => state.orderListState.list);

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
      const totalPrice = orderList[0].reduce((prev, current) => prev + current.price * current.amount, 0);
      const totalPriceToString = totalPrice.toLocaleString();
      return (
        <div className={styles.includeMsg}>
          <div className={styles.wrap}>
            <div className={styles.top}>
              <OrderListBox listData={orderList[0]} />
            </div>
            <div className={styles.line}></div>
            <div className={styles.bottom}>
              <div className={styles.name}>결제금액</div>
              <div className={styles.price}>{totalPriceToString}원</div>
            </div>
          </div>
          <p className={styles.msg}>
            <span>결제는 후불결제입니다.</span>
            <span>현재 앉아 계신 테이블 번호는 N번 입니다.</span>
          </p>
        </div>
      );
    }
    case 'bill': {
      const billArr = createReceipt(orderList);
      const totalPrice = billArr.reduce((result, data) => result + data.price * data.amount, 0);
      const totalPriceToString = totalPrice.toLocaleString();
      return (
        <div className={styles.includeMsg}>
          <p className={styles.msg}>
            <span>결제는 후불결제입니다.</span>
            <span>현재 앉아 계신 테이블 번호는 N번 입니다.</span>
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
