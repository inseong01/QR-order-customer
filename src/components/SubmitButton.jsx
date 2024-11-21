'use client';

import styles from '@/style/SubmitButton.module.css';
import CountButton from './CountButton';
import { countItemAmount, resetCallState } from '@/lib/features/requestState/callSlice';
import { asyncFetchRequestList, changeModalStatus } from '@/lib/features/submitState/submitSlice';
import { resetPickUpState } from '@/lib/features/requestState/pickUpSlice';

import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import Link from 'next/link';

// useSelector 데이터 받아옴

function TotalPrice() {
  // useSelector
  const pickUpList = useSelector((state) => state.pickUpState.list);

  const totalPrice = pickUpList.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
  const totalPriceToString = totalPrice.toLocaleString();
  return (
    <div className={styles.totalPrice}>
      <div className={styles.title}>합계</div>
      <div className={styles.price}>{totalPriceToString}원</div>
    </div>
  );
}

function PickAndCountButton() {
  // useSelector
  const selectedItemArr = useSelector((state) => state.callState.selectedItemArr);
  return (
    <div className={styles.pickAndCount}>
      <ul className={styles.pickList}>
        {selectedItemArr.map((item, idx) => {
          return (
            <motion.li
              key={idx}
              className={styles.list}
              style={{ height: 21, scale: 1 }}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, default: { ease: 'easeOut' } }}
            >
              <div className={styles.name}>{item.name}</div>
              {item.name !== '직원호출' && (
                <CountButton amount={item.amount} idx={idx} countFunction={countItemAmount} />
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

export default function SubmitButton({ type }) {
  // useSelector
  const requestList = useSelector((state) => state.callState.selectedItemArr);
  // dispatch
  const dispatch = useDispatch();

  // 돌아가기
  async function onClickReturnHome() {
    // 초기화
    dispatch(resetPickUpState());
  }
  // 주문하기
  function onClickSubmitOrderList() {
    dispatch(changeModalStatus({ status: true }));
  }
  // 호출하기
  function onClickSubmitRequestList() {
    dispatch(changeModalStatus({ status: true }));
    dispatch(asyncFetchRequestList(requestList)); // 요청 전송
    dispatch(resetCallState()); // 초기화
  }

  switch (type) {
    case 'back': {
      return (
        <div className={styles.wrap} onClick={onClickReturnHome}>
          <Link href={'/visitor'} replace={true} className={styles.bottom}>
            돌아가기
          </Link>
        </div>
      );
    }
    case 'order': {
      return (
        <div className={styles.wrap}>
          <div className={styles.top}>
            <TotalPrice />
          </div>
          <div className={styles.bottom} onClick={onClickSubmitOrderList}>
            주문하기
          </div>
        </div>
      );
    }
    case 'request': {
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
          <div className={styles.bottom} onClick={onClickSubmitRequestList}>
            요청하기
          </div>
        </motion.div>
      );
    }
  }
}
