'use client';

import onClickPush from '@/function/onClickPush';
import { addOrderList } from '@/lib/features/requestState/orderListSlice';
import { asyncFetchOrderList } from '@/lib/features/submitState/submitSlice';
import styles from '@/style/AlertModal.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AlertModal({ type }) {
  const status = useSelector((state) => state.submitState.status);
  const target = useSelector((state) => state.submitState.modal.target);
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const dispatch = useDispatch();
  const router = useRouter();

  function onClickNotEnsureSubmit() {
    const tag = document.getElementById(target);
    tag.close();
  }

  function onClickEnsureSubmit() {
    if (isSubmit) return;
    dispatch(addOrderList({ list: pickUpList }));
    dispatch(asyncFetchOrderList(pickUpList));
  }

  switch (type) {
    case 'orderCheck': {
      return (
        <dialog id="orderCheck" className={styles.wrap}>
          <div className={styles.top}>주문하시겠습니까?</div>
          <div className={styles.bottom}>
            <span className={styles.title} onClick={onClickNotEnsureSubmit}>
              아니요
            </span>
            <span className={styles.title} onClick={onClickEnsureSubmit}>
              예
            </span>
          </div>
        </dialog>
      );
    }
    case 'request': {
      return (
        <dialog id="request" className={styles.wrap}>
          <div className={styles.top}>요청되었습니다</div>
          <div className={styles.bottom} onClick={onClickPush(router, '/visitor')}>
            <span className={`${styles.title} ${styles.last}`}>확인</span>
          </div>
        </dialog>
      );
    }
    case 'empty': {
      return (
        <div id="empty" className={`${styles.wrap} ${styles.error}`}>
          <span className={styles.msg}>항목을 골라주세요</span>
        </div>
      );
    }
  }
}
