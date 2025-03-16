'use client';

import styles from '@/style/visitor/initial/InitialClientPage.module.css';
import InitialHeader from '@/components/visitor/initial/InitialHeader';
import InitialMain from '@/components/visitor/initial/InitialMain';
import DynamicPopUpBox from '@/components/popup/DynamicPopUpBox';
import { useBoundStore } from '@/lib/store/useBoundStore';
import { initCookies } from '@/lib/function/initCookies';

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function InitialClientPage() {
  // usePathname
  const params = useParams<{ table: string }>();
  // store
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const pickUpIsClicked = useBoundStore((state) => state.pickUpState.isClicked);
  const requestIsClicked = useBoundStore((state) => state.requestState.isClicked);
  const modalIsOpen = useBoundStore((state) => state.modalState.isOpen);
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const setTableNumber = useBoundStore((state) => state.setTableNumber);
  const resetRequestState = useBoundStore((state) => state.resetRequestState);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const resetSubmitState = useBoundStore((state) => state.resetSubmitState);
  const resetPickUpState = useBoundStore((state) => state.resetPickUpState);
  const getSelectedMenuCategoryId = useBoundStore((state) => state.getSelectedMenuCategoryId);

  useEffect(() => {
    // 한 번만 지정되도록, 초기 접속 할당 중요
    if (!tableName) {
      // 테이블 - 쿠키 할당
      initCookies(params);
      // 테이블 - 전역 상태
      setTableNumber(params);
    }

    // 모달 초기화
    if (modalIsOpen) {
      setModalOpen({ isOpen: false });
    }

    // 링크 이동 초기화
    if (requestIsClicked) {
      resetRequestState();
    }

    // 제출 초기화
    if (submitStatus === 'fulfilled' || submitStatus === 'rejected') {
      resetSubmitState();
      resetPickUpState();
    }

    // 초기 카테고리 메뉴로 초기화
    getSelectedMenuCategoryId({ id: 1 });
  }, []);

  return (
    <motion.div
      className={styles.wrap}
      style={{ height: pickUpList.length || pickUpIsClicked ? 'calc(100vh + 190px)' : '100vh' }}
    >
      <InitialHeader />
      <InitialMain />
      <DynamicPopUpBox />
    </motion.div>
  );
}
