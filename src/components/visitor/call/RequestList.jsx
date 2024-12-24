import styles from '@/style/visitor/call/RequestList.module.css';
import { selectCallBtn } from '@/lib/features/requestState/callSlice';
import { child, parents } from '@/lib/motion/call/motion_requestList';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function RequestList({ data }) {
  // useSelector
  const selectedItemArr = useSelector((state) => state.callState.selectedItemArr);
  // dispatch
  const dispatch = useDispatch();

  function onClickSelect({ id, title }) {
    return () => {
      dispatch(selectCallBtn({ id, title, amount: 1 }));
    };
  }

  return (
    <motion.div className={styles.middle} initial={'hidden'} animate={'visible'} variants={parents}>
      {data.map((req, idx) => {
        const { title } = req;
        const isIncludedItem = selectedItemArr.some((item) => item.id === req.id);
        return (
          <motion.div
            key={idx}
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
      })}
    </motion.div>
  );
}
