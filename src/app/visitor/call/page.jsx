'use client';

import styles from '@/style/visitor/call/CallPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import AlertModal from '@/components/AlertModal';
import SubmitButton from '@/components/SubmitButton';
import CallPageMain from '@/components/visitor/CallPageMain';
import { resetCallState } from '@/lib/features/requestState/callSlice';
import { changeModalId } from '@/lib/features/submitState/submitSlice';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'motion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function CallPage() {
  // useSelector
  const isClicked = useSelector((state) => state.callState.isClicked);
  const modalStatus = useSelector((state) => state.submitState.modal.status);
  const target = useSelector((state) => state.submitState.modal.target);
  // dispatch
  const dispatch = useDispatch();
  // Query
  const queryClient = new QueryClient();

  useEffect(() => {
    dispatch(resetCallState());
    dispatch(changeModalId({ target: 'request' }));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.wrap}>
        <AppVisitorHeader title={'직원호출'} />
        <CallPageMain />
        <AnimatePresence>
          {isClicked && <SubmitButton key={'SubmitButton'} type={'request'} />}
        </AnimatePresence>
        <AnimatePresence>{modalStatus && <AlertModal key={'AlertModal'} type={target} />}</AnimatePresence>
      </div>
    </QueryClientProvider>
  );
}
