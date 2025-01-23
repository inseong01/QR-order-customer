import styles from '@/style/visitor/pickUpList/ProcessOrder.module.css';
import OrderSubmitComplete from '@/components/OrderSubmitComplete';
import OrderList from '@/components/OrderList';
import { orderListQueryOption } from '@/lib/function/useQuery/queryOption';
import { useBoundStore } from '@/lib/store/useBoundStore';
import PickUpListUl from './PickUpListUl';

import { AnimatePresence, motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function ProcessOrder() {
  // store
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  // useQuery
  const { refetch, error, isError } = useQuery(orderListQueryOption(tableNum));
  console.log(error, isError);
  // useState
  const [isCurrent, setCurrent] = useState(false);

  // 주문 완료 시 주문 데이터 추출
  useEffect(() => {
    // 중복 refetch 제한
    if (isCurrent) return;
    // submitStatus 상황 별 처리
    if (submitStatus === 'fulfilled') {
      refetch();
      setCurrent(true);
    } else if (submitStatus === 'rejected') {
      setCurrent(true);
    }
  }, [submitStatus]);

  return (
    <AnimatePresence mode="popLayout">
      {!isCurrent ? (
        <motion.main
          className={styles.main}
          key={'NotCompletedOrder'}
          initial={{ x: '0%' }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className={styles.titleBox}>
            <div className={styles.title}>주문표 목록</div>
            <div className={styles.line}></div>
          </div>
          <PickUpListUl />
        </motion.main>
      ) : (
        <motion.main
          className={styles.main}
          key={'CompletedOrder'}
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <OrderSubmitComplete />
          <OrderList type={'currentOrderList'} />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
