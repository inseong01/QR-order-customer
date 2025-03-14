'use client';

import styles from '@/style/AppVisitorHeader.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import { HeaderTitle } from '@/types/common';
import SimpleIcon from './SimpleIcon';

import { useRouter } from 'next/navigation';
import { memo } from 'react';

function AppVisitorHeader({ title }: { title: HeaderTitle }) {
  // store
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const getSelectedMenuCategoryId = useBoundStore((state) => state.getSelectedMenuCategoryId);
  // useRouter
  const router = useRouter();

  function navOnClickBack() {
    if (isSubmit) return;
    if (submitStatus === 'fulfilled') {
      // 초기 카테고리 메뉴로 초기화
      getSelectedMenuCategoryId({ id: 1 });
      // 주문 페이지 돌아오기 방지
      router.replace(`/${tableName}`);
      return;
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
