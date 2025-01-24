import styles from '@/style/visitor/pickUpList/ProcessOrder.module.css';
import OrderSubmitComplete from '@/components/OrderSubmitComplete';
import OrderList from '@/components/OrderList';
import { orderListQueryOption } from '@/lib/function/useQuery/queryOption';
import { useBoundStore } from '@/lib/store/useBoundStore';
import PickUpListUl from './PickUpListUl';

import { AnimatePresence, motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function CurrentComponent() {
  return (
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
  );
}

function NextComponent() {
  return (
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
  );
}

export default function ProcessOrder() {
  // store
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  // useQuery
  const { refetch } = useQuery(orderListQueryOption(tableNum));
  // useState
  const [nextPage, setNext] = useState(false);

  // 주문 완료 시 주문 데이터 추출
  useEffect(() => {
    // 중복 refetch 제한
    if (nextPage) return;
    // submitStatus 상황 별 처리
    if (!submitStatus) return;
    if (submitStatus === 'pending') return;
    if (submitStatus === 'fulfilled') {
      refetch();
    }
    setNext(true);
  }, [submitStatus]);

  return (
    <AnimatePresence mode="popLayout">{!nextPage ? <CurrentComponent /> : <NextComponent />}</AnimatePresence>
  );
}
