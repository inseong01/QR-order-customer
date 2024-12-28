'use client';

import styles from '@/style/visitor/call/CallPageWrap.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { resetCallState } from '@/lib/features/callState/callSlice';
import { changeModalId } from '@/lib/features/submitState/submitSlice';
import CallPageMain from './CallPageMain';
import SubmitButtonWrap from './SubmitButtonWrap';
import DynamicAlertModalBox from '../../alertModal/DynamicAlertModalBox';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function CallPageWrap() {
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCallState());
    dispatch(changeModalId({ target: 'request' }));
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
