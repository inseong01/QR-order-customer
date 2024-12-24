import styles from '@/style/visitor/pickUpList/CompletedOrder.module.css';
import getTableOrderList from '@/lib/supabase/function/getTableOrderList';
import OrderList from '@/components/OrderList';
import OrderSubmit from '@/components/OrderSubmit';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export default function CompletedOrder() {
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

  useEffect(() => {
    if (isFetching || submitStatus !== 'fulfilled') return;
    const sortOrder = [...data[0].order].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    getCurrentOrder(sortOrder[0].orderList);
  }, [data, isFetching, submitStatus]);

  return (
    <motion.main
      className={styles.main}
      key={'OK'}
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <OrderSubmit />
      <OrderList type={'currentOrderList'} listData={currentOrder} />
    </motion.main>
  );
}
