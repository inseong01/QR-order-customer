import styles from '@/style/visitor/initial/InitialHeader.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

import { motion } from 'motion/react';

export default function HeaderMiddle() {
  const tableName = useBoundStore((state) => state.tableState.tableName);

  return (
    <div className={styles.middle}>
      <div className={styles.restaurantName}>
        <span>희락카츠 </span>
        {tableName ? (
          <motion.span className={styles.table} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            #{tableName}
          </motion.span>
        ) : null}
      </div>
      <div className={styles.description}>주문하실 음식을 골라주세요</div>
    </div>
  );
}
