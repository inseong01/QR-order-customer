import styles from '@/style/OrderSubmitComplete.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import { TableList } from '@/types/common';

import { useQueryClient } from '@tanstack/react-query';

export default function OrderSubmitComplete() {
  // store
  const submitStatus = useBoundStore((state) => state.submitState.status);
  // useQueryClient
  const query = useQueryClient();
  const queryState = query.getQueryState<TableList>(['orderList']);
  // variant
  const isOk = submitStatus === 'fulfilled' && queryState?.status === 'success';
  const status = isOk ? 'ok' : 'fail';
  const result = isOk ? '완료' : '실패';
  const description = isOk
    ? '정상적으로 접수되었어요, 조금만 기다려주세요!'
    : '정상적으로 접수되지 않았어요, 직원을 호출해주세요!';

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>
        주문이 <span className={styles[status]}>{result}</span>되었어요
      </h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
