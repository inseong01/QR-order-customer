'use client';

import styles from '@/style/AppVisitorHeader.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import SimpleIcon from './SimpleIcon';

import { useRouter } from 'next/navigation';
import { memo } from 'react';

function AppVisitorHeader({ title }) {
  // store
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const resetPickUpState = useBoundStore((state) => state.resetPickUpState);
  // useRouter
  const router = useRouter();

  function navOnClickBack() {
    if (isSubmit) return;
    if (submitStatus === 'fulfilled') {
      // 주문완료 이후 초기화
      resetPickUpState();
    }
    router.back();
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div onClick={navOnClickBack} className={styles.nav}>
          <SimpleIcon type={'arrow-left'} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </header>
  );
}

export default memo(AppVisitorHeader);
