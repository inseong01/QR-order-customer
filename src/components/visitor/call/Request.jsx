import styles from '@/style/visitor/call/Request.module.css';
import { selectCallBtn } from '@/lib/features/callState/callSlice';
import { child } from '@/lib/motion/call/motion_requestList';

import { motion } from 'motion/react';
import { useDispatch } from 'react-redux';
import { memo } from 'react';

function Request({ req, isIncludedItem }) {
  // useDispatch
  const dispatch = useDispatch();
  // variant
  const { title } = req;

  function onClickSelect({ id, title }) {
    return () => {
      dispatch(selectCallBtn({ id, title, amount: 1 }));
    };
  }

  return (
    <motion.div
      className={`${styles.btn} ${isIncludedItem ? styles.clicked : ''}`}
      onClick={onClickSelect(req)}
      variants={child}
      whileTap={{
        scale: 0.85,
        backgroundColor: '#4caff8',
        color: 'rgb(255, 255, 255)',
        transition: { duration: 0.7 },
      }}
    >
      <div>{title}</div>
    </motion.div>
  );
}

export default memo(Request);
