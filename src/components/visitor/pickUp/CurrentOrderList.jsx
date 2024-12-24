import styles from '@/style/OrderList.module.css';
import getTableOrderList from '@/lib/supabase/function/getTableOrderList';
import OrderListBox from '../order/OrderListBox';

import { useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export default function CurrentOrderList() {
  // useSelector
  const tableNum = useSelector((state) => state.userState.tableNum);
  const submitStatus = useSelector((state) => state.submitState.status);
  // useQuery
  const { data } = useSuspenseQuery({
    queryKey: ['orderList', submitStatus],
    queryFn: () => getTableOrderList(tableNum),
  });

  useEffect(() => {
    if (!data) return;
  }, [data]);

  const latestOrder = data[0].order.findLast((order) => order);
  const totalPrice = latestOrder.orderList.reduce(
    (prev, current) => prev + current.price * current.amount,
    0
  );
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <div className={styles.includeMsg}>
      <div className={styles.wrap}>
        <div className={styles.top}>
          <OrderListBox listData={latestOrder.orderList} />
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
