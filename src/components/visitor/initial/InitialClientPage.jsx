'use client';

import styles from '@/style/visitor/initial/InitialClientPage.module.css';
import InitialHeader from '@/components/visitor/initial/InitialHeader';
import InitialMain from '@/components/visitor/initial/InitialMain';
import { resetSubmitState } from '@/lib/features/submitState/submitSlice';
import { resetRequestState } from '@/lib/features/requestState/requestSlice';
import DynamicPopUpBox from '@/components/popup/DynamicPopUpBox';

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { setInitCookies } from '@/app/[table]/actions';
import { useBoundStroe } from '@/lib/store/useBoundStroe';

export default function InitialClientPage() {
  // useSelector
  const pickUpIsClicked = useSelector((state) => state.pickUpState.isClicked);
  const pickUpList = useSelector((state) => state.pickUpState.list);
  // dispatch
  const dispatch = useDispatch();
  // usePathname
  const params = useParams();
  // store
  const store = useBoundStroe((state) => state);
  const setTableNumber = useBoundStroe((state) => state.setTableNumber);

  // 2번 반복됨 -> 개발 모드여서?
  useEffect(() => {
    // 고유 테이블 숫자 할당
    // async function initCookies(params) {
    //   try {
    //     await setInitCookies(params);
    //     console.log('Cookies initialized successfully.');
    //   } catch (error) {
    //     console.error('Failed to set cookies:', error);
    //   }
    // }
    // initCookies(params);
    setTableNumber(params);

    // 직원호출 초기화
    dispatch(resetSubmitState());

    // 팝업 초기화
    dispatch(resetRequestState());
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
