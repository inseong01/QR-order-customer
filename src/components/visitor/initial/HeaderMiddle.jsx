import styles from '@/style/visitor/initial/InitialHeader.module.css';

// import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { useBoundStroe } from '@/lib/store/useBoundStroe';

export default function HeaderMiddle() {
  const tableNum = useBoundStroe((state) => state.table);

  return (
    <div className={styles.middle}>
      <div className={styles.restaurantName}>
        <span>희락카츠 </span>
        {tableNum ? (
          <motion.span className={styles.table} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            #{tableNum}
          </motion.span>
        ) : null}
      </div>
      <div className={styles.description}>주문하실 음식을 골라주세요</div>
    </div>
  );
}
