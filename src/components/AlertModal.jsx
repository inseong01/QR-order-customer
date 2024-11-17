'use client';

import onClickPush from '@/function/onClickPush';
import styles from '@/style/AlertModal.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function AlertModal({ type }) {
  const status = useSelector((state) => state.submitState.status);
  const router = useRouter();

  useEffect(() => {}, [status]);

  switch (type) {
    case 'orderCheck': {
      return (
        <dialog id="order" className={styles.wrap}>
          <div className={styles.top}>주문하시겠습니까?</div>
          <div className={styles.bottom}>
            <span className={styles.title}>아니요</span>
            <span className={styles.title}>예</span>
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
        <div className={`${styles.wrap} ${styles.error}`}>
          <span className={styles.msg}>항목을 골라주세요</span>
        </div>
      );
    }
  }
}
