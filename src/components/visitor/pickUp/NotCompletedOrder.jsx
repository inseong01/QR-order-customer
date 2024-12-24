import styles from '@/style/visitor/pickUpList/NotCompletedOrder.module.css';
import PickUpListUl from './PickUpListUl';
import AlertModal from '../../AlertModal';

import { motion, AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';

export default function NotCompletedOrder() {
  // useSelector
  const target = useSelector((state) => state.submitState.modal.target);
  const modalStatus = useSelector((state) => state.submitState.modal.status);

  return (
    <motion.main
      className={styles.main}
      key={'checkCurrentOrderList'}
      style={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className={styles.titleBox}>
        <div className={styles.title}>주문표 목록</div>
        <div className={styles.line}></div>
      </div>
      <PickUpListUl />
      <AnimatePresence>{modalStatus && <AlertModal key={'AlertModal'} type={target} />}</AnimatePresence>
    </motion.main>
  );
}
