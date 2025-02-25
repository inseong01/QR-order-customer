import styles from '@/style/SubmitButton.module.css';
import PickAndCountButton from './PickAndCountButton';
import SubmitRequestBtn from './SubmitRequestBtn';

import { motion } from 'motion/react';

export default function SubmitRequest() {
  return (
    <motion.div
      className={styles.wrap}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ bounce: 0, ease: 'easeOut' }}
    >
      <div className={styles.top}>
        <PickAndCountButton />
      </div>
      <div className={styles.bottom}>
        <SubmitRequestBtn />
      </div>
    </motion.div>
  );
}
