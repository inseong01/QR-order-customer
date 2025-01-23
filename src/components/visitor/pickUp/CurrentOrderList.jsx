import styles from '@/style/OrderList.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import OrderListBox from '../order/OrderListBox';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderListQueryOption } from '@/lib/function/useQuery/queryOption';

export default function CurrentOrderList() {
  // store
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  // useQuery
  const { data, isError } = useQuery(orderListQueryOption(tableNum));
  // variant
  const latestOrder = data && data[0].order.findLast((order) => order);
  const totalPrice = latestOrder?.orderList.reduce(
    (prev, current) => prev + current.price * current.amount,
    0
  );
  const totalPriceToString = totalPrice?.toLocaleString();

  useEffect(() => {
    if (!data) return;
  }, [data]);

  return (
    <div className={styles.includeMsg}>
      <div className={styles.wrap}>
        {submitStatus === 'rejected' ? (
          <div className={styles.empty}>접수된 주문이 없습니다.</div>
        ) : (
          <>
            <div className={styles.top}>
              <OrderListBox listData={latestOrder?.orderList} />
            </div>
            <div className={styles.line}></div>
            <div className={styles.bottom}>
              <div className={styles.name}>결제금액</div>
              <div className={styles.price}>{totalPriceToString}원</div>
            </div>
          </>
        )}
      </div>
      <p className={styles.msg}>
        <span>결제는 후불결제입니다.</span>
        <span>현재 앉아 계신 테이블 번호는 {tableNum}번 입니다.</span>
      </p>
    </div>
  );
}
