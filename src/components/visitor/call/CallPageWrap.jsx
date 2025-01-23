'use client';

import styles from '@/style/visitor/call/CallPageWrap.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { useBoundStore } from '@/lib/store/useBoundStore';
import CallPageMain from './CallPageMain';
import SubmitButtonWrap from './SubmitButtonWrap';
import DynamicAlertModalBox from '../../alertModal/DynamicAlertModalBox';

import { useEffect } from 'react';

export default function CallPageWrap() {
  const resetCallState = useBoundStore((state) => state.resetCallState);
  const setModalType = useBoundStore((state) => state.setModalType);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);

  useEffect(() => {
    resetCallState();
    setModalType({ type: 'request' });
    setRequestClick({ isClicked: false });
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'직원호출'} />
      <CallPageMain />
      <SubmitButtonWrap />
      <DynamicAlertModalBox />
    </div>
  );
}
