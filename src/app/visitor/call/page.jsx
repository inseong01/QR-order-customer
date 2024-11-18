'use client';

import styles from '@/style/visitor/call/CallPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import SubmitButton from '@/components/SubmitButton';
import AlertModal from '@/components/AlertModal';
import CallPageMain from '@/components/visitor/CallPageMain';
import { resetCallState } from '@/lib/features/requestState/callSlice';
import { changeModalId } from '@/lib/features/submitState/submitSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CallPage() {
  const isClicked = useSelector((state) => state.callState.isClicked);
  const target = useSelector((state) => state.submitState.modal.target);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCallState());
    dispatch(changeModalId({ target: 'request' }));
  }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'직원호출'} />
      <CallPageMain />
      {isClicked && <SubmitButton type={'request'} />}
      <AlertModal type={target} />
    </div>
  );
}
