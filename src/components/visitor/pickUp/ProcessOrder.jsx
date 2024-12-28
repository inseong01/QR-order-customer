import styles from '@/style/visitor/pickUpList/ProcessOrder.module.css';
import OrderSubmit from '@/components/OrderSubmit';
import OrderList from '@/components/OrderList';
import getTableOrderList from '@/lib/supabase/function/getTableOrderList';
import PickUpListUl from './PickUpListUl';

import { AnimatePresence, motion } from 'motion/react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function ProcessOrder() {
  // useSelector
  const submitStatus = useSelector((state) => state.submitState.status);
  const tableNum = useSelector((state) => state.userState.tableNum);
  // useQuery
  const { data, isFetching } = useQuery({
    queryKey: ['orderList', submitStatus],
    queryFn: () => getTableOrderList(tableNum),
  });
  // useState
  const [currentOrder, getCurrentOrder] = useState([]);

  // 주문 완료 시 주문 데이터 추출
  useEffect(() => {
    if (isFetching || submitStatus !== 'fulfilled') return;
    const sortOrder = [...data[0].order].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    getCurrentOrder(sortOrder[0].orderList);
  }, [data, isFetching, submitStatus]);

  return (
    <AnimatePresence mode="popLayout">
      {submitStatus !== 'fulfilled' ? (
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
          <OrderSubmit />
          <OrderList type={'currentOrderList'} listData={currentOrder} />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
