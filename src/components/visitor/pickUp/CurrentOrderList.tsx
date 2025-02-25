import styles from '@/style/OrderList.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import { TableList } from '@/types/common';
import OrderListBox from '../order/OrderListBox';

import { useQueryClient } from '@tanstack/react-query';

function EmptyListComponent() {
  return <div className={styles.empty}>접수된 주문이 없습니다.</div>;
}

// queryData 어떻게 나오는 지 확인요
function CurrentListComponent({ queryData }: { queryData?: TableList[] }) {
  const latestOrder = queryData && queryData[0].order.findLast((order) => order);
  const totalPrice = latestOrder?.orderList.reduce(
    (prev, current) => prev + current.price * current.amount,
    0
  );
  const totalPriceToString = totalPrice?.toLocaleString();

  return (
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
  );
}

export default function CurrentOrderList() {
  // store
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  // useQueryClient
  const query = useQueryClient();
  const queryState = query.getQueryState<TableList[]>(['orderList']);
  // variant
  const isOk = submitStatus === 'fulfilled' && queryState?.status === 'success';

  return (
    <div className={styles.includeMsg}>
      <div className={styles.wrap}>
        {isOk ? <CurrentListComponent queryData={queryState.data} /> : <EmptyListComponent />}
      </div>
      <p className={styles.msg}>
        <span>결제는 후불결제입니다.</span>
        <span>현재 앉아 계신 테이블 번호는 {tableNum}번 입니다.</span>
      </p>
    </div>
  );
}
