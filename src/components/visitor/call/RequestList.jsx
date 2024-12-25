import styles from '@/style/visitor/call/RequestList.module.css';
import { parents } from '@/lib/motion/call/motion_requestList';
import Request from './Request';

import { motion } from 'motion/react';

export default function RequestList({ data }) {
  return (
    <motion.div className={styles.middle} initial={'hidden'} animate={'visible'} variants={parents}>
      {data.map((req, idx) => {
        return <Request key={idx} req={req} />;
      })}
    </motion.div>
  );
}
