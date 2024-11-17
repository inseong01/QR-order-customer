'use client';

import styles from '@/style/visitor/call/CallPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import SubmitButton from '@/components/SubmitButton';
import AlertModal from '@/components/AlertModal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CallPageMain from '@/components/visitor/CallPageMain';
import { resetCallState } from '@/lib/features/requestState/callSlice';
import { changeModalTarget, resetSubmitState } from '@/lib/features/submitState/submitSlice';

export default function CallPage() {
  const requestList = useSelector((state) => state.callState.selectedItemArr);
  const isClicked = useSelector((state) => state.callState.isClicked);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const target = useSelector((state) => state.submitState.modal.target);

  const dispatch = useDispatch();
  console.log(requestList);

  useEffect(() => {
    dispatch(resetCallState());
    dispatch(changeModalTarget({ target: 'request' }));
  }, []);

  useEffect(() => {
    if (!target) return;
    const tag = document.getElementById(target);
    tag.showModal();
  }, [isSubmit]);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'직원호출'} />
      <CallPageMain />
      {isClicked && <SubmitButton type={'request'} />}
      {isSubmit && <AlertModal type={target} />}
    </div>
  );
}
