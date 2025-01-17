'use client';

import styles from '@/style/visitor/initial/InitialClientPage.module.css';
import InitialHeader from '@/components/visitor/initial/InitialHeader';
import InitialMain from '@/components/visitor/initial/InitialMain';
import { resetSubmitState } from '@/lib/features/submitState/submitSlice';
import { setTableNum } from '@/lib/features/userState/userSlice';
import { resetRequestState } from '@/lib/features/requestState/requestSlice';
import DynamicPopUpBox from '@/components/popup/DynamicPopUpBox';

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

export default function InitialClientPage() {
  // useSelector
  const pickUpIsClicked = useSelector((state) => state.pickUpState.isClicked);
  const pickUpList = useSelector((state) => state.pickUpState.list);
  // dispatch
  const dispatch = useDispatch();
  // usePathname
  const pathName = usePathname();

  // 2번 반복됨 -> 개발 모드여서?
  useEffect(() => {
    // 직원호출 초기화
    dispatch(resetSubmitState());

    // 팝업 초기화
    dispatch(resetRequestState());

    // 고유 테이블 숫자 할당 (가끔 초기값 0으로 설정될 때 있음)
    const tableNum = Number(pathName.replace('/', ''));
    dispatch(setTableNum({ tableNum }));
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
