import styles from '@/style/OrderList.module.css';
import createReceipt from '@/lib/function/createReceipt';
import { useBoundStore } from '@/lib/store/useBoundStore';
import { orderListQueryOption } from '@/lib/function/useQuery/queryOption';
import { MsgType, OrderListType } from '@/types/common';
import OrderListBox from '../order/OrderListBox';

import { useQueryClient } from '@tanstack/react-query';

function ReceiptComponent({ orderListArr }: { orderListArr: OrderListType[][] }) {
  const billArr = createReceipt(orderListArr);
  const totalPrice = billArr.reduce((result, data) => result + data.price * data.amount, 0);
  const totalPriceToString = totalPrice.toLocaleString();
  return (
    <>
      {orderListArr.length === 0 ? (
        <MessageTypeComponent type={'empty'} />
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
    </>
  );
}

function MessageTypeComponent({ type }: { type: MsgType }) {
  const description =
    type === 'error'
      ? '목록을 불러오는 데 오류가 발생했습니다. 카운터에서 확인해 주세요.'
      : '주문 내역이 없습니다.';
  return (
    <p className={styles.msg}>
      <span className={styles.status}>{description}</span>
    </p>
  );
}

export default function BillList() {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  // useQueryClient
  const queryClient = useQueryClient();
  const table = queryClient.getQueryState(orderListQueryOption(tableName).queryKey);
  // variant
  const isError = !table || table.status === 'error';
  const tableData = table?.data?.[0];
  const orderData = tableData?.order ?? [];
  const orderListArr = isError ? [] : orderData.map((list) => list.orderList);

  return (
    <div className={styles.includeMsg}>
      <p className={styles.msg}>
        <span>결제는 후불입니다.</span>
        <span>현재 앉아 계신 테이블 번호는 {tableName}번 입니다.</span>
      </p>
      <div className={styles.wrap}>
        {isError ? <MessageTypeComponent type={'error'} /> : <ReceiptComponent orderListArr={orderListArr} />}
      </div>
    </div>
  );
}
