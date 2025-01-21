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
  const params = useParams();
  // store
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const pickUpIsClicked = useBoundStore((state) => state.pickUpState.isClicked);
  const requestIsClicked = useBoundStore((state) => state.requestState.isClicked);
  const modalIsOpen = useBoundStore((state) => state.modalState.isOpen);
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const setTableNumber = useBoundStore((state) => state.setTableNumber);
  const resetRequestState = useBoundStore((state) => state.resetRequestState);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);

  // 2번 반복됨 -> 개발 모드여서?
  useEffect(() => {
    // 한 번만 지정되도록, 첫 접속 할당 중요
    if (!tableNum) {
      // 테이블 - 쿠키 할당
      initCookies(params);
      // 테이블 - 전역 상태
      setTableNumber(params);
    }

    // 모달 초기화
    if (modalIsOpen) {
      setModalOpen({ isOpen: false });
    }

    // 팝업 초기화
    if (requestIsClicked) {
      resetRequestState();
    }
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
