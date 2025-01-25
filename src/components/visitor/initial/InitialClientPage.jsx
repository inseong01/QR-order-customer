'use client';

import styles from '@/style/visitor/initial/InitialClientPage.module.css';
import InitialHeader from '@/components/visitor/initial/InitialHeader';
import InitialMain from '@/components/visitor/initial/InitialMain';
import DynamicPopUpBox from '@/components/popup/DynamicPopUpBox';
import Loading from '@/components/loading/Loading';
import { useBoundStore } from '@/lib/store/useBoundStore';
import { initCookies } from '@/lib/function/initCookies';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

function LoadedComponent() {
  // usePathname
  const params = useParams();
  // store
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const pickUpIsClicked = useBoundStore((state) => state.pickUpState.isClicked);
  const requestIsClicked = useBoundStore((state) => state.requestState.isClicked);
  const modalIsOpen = useBoundStore((state) => state.modalState.isOpen);
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const setTableNumber = useBoundStore((state) => state.setTableNumber);
  const resetRequestState = useBoundStore((state) => state.resetRequestState);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const resetSubmitState = useBoundStore((state) => state.resetSubmitState);

  // 2번 반복 (개발 모드)
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

    // 링크 이동 초기화
    if (requestIsClicked) {
      resetRequestState();
    }

    // 제출 초기화
    if (submitStatus === 'fulfilled' || submitStatus === 'rejected') {
      resetSubmitState();
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

export default function InitialClientPage() {
  // useState
  const [screenLoading, setLoading] = useState(true);
  // useQueryClient
  const queryClient = useQueryClient();
  const [menuList, categoryList] = queryClient.getQueriesData();

  // 로딩 여부
  useEffect(() => {
    /*
      <Suspense />로 감싸지 않은 이유
      : 두 쿼리가 SSR로 미리 데이터가 불러와져 isLoading: false, isFetched: true를 반환,
        페이지가 마운트 되었을 때 useState 초기 값에 맞춰 로딩 UI 노출,
        데이터가 없다면 undefined 반환
    */
    if (!menuList || !categoryList) return;
    setLoading(false);
  }, [menuList, categoryList]);

  return <>{screenLoading ? <Loading type={'init'} /> : <LoadedComponent />}</>;
}
