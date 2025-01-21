'use client';

import styles from '@/style/visitor/initial/InitialClientPage.module.css';
import InitialHeader from '@/components/visitor/initial/InitialHeader';
import InitialMain from '@/components/visitor/initial/InitialMain';
import DynamicPopUpBox from '@/components/popup/DynamicPopUpBox';
import { setInitCookies } from '@/app/[table]/actions';
import { useBoundStore } from '@/lib/store/useBoundStore';

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function InitialClientPage() {
  // usePathname
  const params = useParams();
  // store
  const store = useBoundStore((state) => state);
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const pickUpIsClicked = useBoundStore((state) => state.pickUpState.isClicked);
  const requestIsClicked = useBoundStore((state) => state.requestState.isClicked);
  const modalIsOpen = useBoundStore((state) => state.modalState.isOpen);
  const setTableNumber = useBoundStore((state) => state.setTableNumber);
  const resetRequestState = useBoundStore((state) => state.resetRequestState);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);

  // 2번 반복됨 -> 개발 모드여서?
  useEffect(() => {
    // 고유 테이블 숫자 할당
    setTableNumber(params);

    // 모달 초기화
    if (modalIsOpen) {
      setModalOpen({ isOpen: false });
    }

    // 팝업 초기화
    if (requestIsClicked) {
      resetRequestState();
    }
  }, []);
  console.log(store);
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
