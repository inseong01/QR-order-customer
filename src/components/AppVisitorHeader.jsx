'use client';

import styles from '@/style/AppVisitorHeader.module.css';
import { resetPickUpState } from '@/lib/features/pickUpState/pickUpSlice';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

function AppVisitorHeader({ title }) {
  // useSelector
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const submitStatus = useSelector((state) => state.submitState.status);
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const router = useRouter();

  function navOnClickBack() {
    if (isSubmit) return;
    if (submitStatus === 'fulfilled') {
      // 주문완료 이후 초기화
      dispatch(resetPickUpState());
    }
    router.back();
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div onClick={navOnClickBack} className={styles.nav}>
          <Image src={'/img/back-button.webp'} alt={'이전'} width={15} height={15} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </header>
  );
}

export default memo(AppVisitorHeader);
