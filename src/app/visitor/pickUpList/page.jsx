'use client';

import styles from '@/style/visitor/pickUpList/PickUpList.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import CountButton from '@/components/CountButton';
import SubmitButton from '@/components/SubmitButton';
import OrderSubmit from '@/components/OrderSubmit';
import OrderList from '@/components/OrderList';
import AlertModal from '@/components/AlertModal';
import { calculateAmountInPickUpList, deletePickUpList } from '@/lib/features/requestState/pickUpSlice';
import { changeModalId } from '@/lib/features/submitState/submitSlice';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';

export default function PickUpListPage() {
  // useSelector
  const submitStatus = useSelector((state) => state.submitState.status);
  const currentOrderList = useSelector((state) => state.pickUpState.list);
  const target = useSelector((state) => state.submitState.modal.target);
  const modalStatus = useSelector((state) => state.submitState.modal.status);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeModalId({ target: 'orderCheck' }));
  }, []);

  function onClickdeletePickUpList({ key }) {
    return () => {
      dispatch(deletePickUpList({ key }));
    };
  }

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={submitStatus !== 'OK' ? '주문표' : '주문완료'} />
      <AnimatePresence mode="popLayout">
        {submitStatus !== 'OK' ? (
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
            <ul className={`${styles.pickUpLists}`}>
              {currentOrderList.length !== 0 ? (
                <>
                  {currentOrderList.map((list, idx) => {
                    const { name, price, amount } = list;
                    const priceToString = price.toLocaleString();
                    return (
                      <li key={idx} className={styles.list}>
                        <div className={styles.middle}>
                          <div className={styles.top}>
                            <div className={styles.name}>{name}</div>
                            <div className={styles.price}>{priceToString}원</div>
                          </div>
                          <div className={styles.bottom}>
                            <div className={styles.deleteBtn} onClick={onClickdeletePickUpList(list)}>
                              빼기
                            </div>
                            <CountButton
                              amount={amount}
                              idx={idx}
                              countFunction={calculateAmountInPickUpList}
                            />
                          </div>
                        </div>
                        <div className={styles.line}></div>
                      </li>
                    );
                  })}
                </>
              ) : (
                <li>주문 목록이 없습니다.</li>
              )}
            </ul>
            <AnimatePresence>
              {modalStatus && <AlertModal key={'AlertModal'} type={target} />}
            </AnimatePresence>
          </motion.main>
        ) : (
          <motion.main
            className={styles.main}
            key={'OK'}
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <OrderSubmit />
            <OrderList type={'currentOrderList'} />
          </motion.main>
        )}
      </AnimatePresence>
      <SubmitButton
        type={submitStatus !== 'OK' ? (currentOrderList.length !== 0 ? 'order' : 'back') : 'back'}
      />
    </div>
  );
}
