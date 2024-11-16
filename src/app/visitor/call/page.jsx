'use client';

import styles from '@/style/visitor/call/CallPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import SubmitButton from '@/components/SubmitButton';
import AlertModal from '@/components/AlertModal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CallPageMain from '@/components/visitor/CallPageMain';

export default function CallPage() {
  // useEffect(() => {
  //   const tag = document.getElementById('alertModal');
  //   tag.showModal();
  // }, []);
  const isClicked = useSelector((state) => state.callState.isClicked);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'직원호출'} />
      <CallPageMain />
      {isClicked && <SubmitButton />}
      {/* <AlertModal type={'empty'} /> */}
    </div>
  );
}
