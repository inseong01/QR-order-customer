import styles from '@/style/OrderList.module.css';
import createReceipt from '@/lib/function/createReceipt';
import getTableOrderList from '@/lib/supabase/function/getTableOrderList';
import OrderListBox from '../order/OrderListBox';

import { useSelector } from 'react-redux';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function BillList() {
  // useSelector
  const tableNum = useSelector((state) => state.userState.tableNum);
  // useQuery
  const { data } = useSuspenseQuery({
    queryKey: ['orderList'],
    queryFn: () => getTableOrderList(tableNum),
  });

  useEffect(() => {
    console.log('data: ', data);
    if (!data) return;
  }, [data]);

  const orderListArr = data[0].order?.map((list) => list.orderList) ?? [];
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
