'use client';

import styles from '@/style/visitor/call/CallPageMain.module.css';
import fetchMenuData from '@/function/firebase/fetchMenuData';
import { selectCallBtn } from '@/lib/features/requestState/callSlice';

import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';

export default function CallPageMain() {
  // useSelector
  const selectedItemArr = useSelector((state) => state.callState.selectedItemArr);
  // dispatch
  const dispatch = useDispatch();
  // useQuery
  const { data, isLoading } = useQuery({
    queryKey: ['requestList'],
    queryFn: () => fetchMenuData('request/list'),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  function onClickSelect({ key, name }) {
    return () => {
      dispatch(selectCallBtn({ key, name, amount: 1 }));
    };
  }

  // motion
  const parents = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const child = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
    },
  };

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.title}>요청 항목을 선택해주세요</div>
        <div className={styles.line}></div>
      </div>
      <AnimatePresence>
        {data && (
          <motion.div className={styles.middle} initial={'hidden'} animate={'visible'} variants={parents}>
            {data.map((req, idx) => {
              const { name } = req;
              const isIncludedItem = selectedItemArr.some((item) => item.key === req.key);
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
                  <div className={styles.title}>{name}</div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
