import styles from '@/style/visitor/call/RequestList.module.css';
import { parents } from '@/lib/motion/call/motion_requestList';
import { useBoundStore } from '@/lib/store/useBoundStore';
import Request from './Request';

import { motion } from 'motion/react';

export default function RequestList({ data }) {
  const selectedItemArr = useBoundStore((state) => state.callState.selectedItemArr);

  return (
    <motion.div className={styles.middle} initial={'hidden'} animate={'visible'} variants={parents}>
      {data.map((req, idx) => {
        const isIncludedItem = selectedItemArr.some((item) => item.id === req.id);
        return <Request key={idx} req={req} isIncludedItem={isIncludedItem} />;
      })}
    </motion.div>
  );
}
