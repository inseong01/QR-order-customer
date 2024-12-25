import styles from '@/style/submitButton/PickItem.module.css';
import { countItemAmount } from '@/lib/features/callState/callSlice';
import CountButton from '../CountButton';

import { motion } from 'motion/react';

export default function PickItem({ item, idx }) {
  return (
    <motion.li
      className={styles.list}
      style={{ scale: 1 }}
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, default: { ease: 'easeOut' } }}
    >
      <div className={styles.name}>{item.title}</div>
      {item.title !== '직원호출' && (
        <CountButton amount={item.amount} idx={idx} countFunction={countItemAmount} />
      )}
    </motion.li>
  );
}
