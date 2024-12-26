import styles from '@/style/visitor/call/RequestList.module.css';
import { parents } from '@/lib/motion/call/motion_requestList';
import Request from './Request';

import { motion } from 'motion/react';
import { useSelector } from 'react-redux';

export default function RequestList({ data }) {
  // useSelector
  const selectedItemArr = useSelector((state) => state.callState.selectedItemArr);

  return (
    <motion.div className={styles.middle} initial={'hidden'} animate={'visible'} variants={parents}>
      {data.map((req, idx) => {
        const isIncludedItem = selectedItemArr.some((item) => item.id === req.id);
        return <Request key={idx} req={req} isIncludedItem={isIncludedItem} />;
      })}
    </motion.div>
  );
}
