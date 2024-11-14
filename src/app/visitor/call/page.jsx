'use client';

import styles from '@/style/visitor/call/CallPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import RequestButton from '@/components/RequestButton';
import SubmitButton from '@/components/SubmitButton';
import AlertModal from '@/components/AlertModal';
import { useEffect } from 'react';

const requestListArr = [
  { title: '숟저' },
  { title: '젓가락' },
  { title: '물' },
  { title: '앞치마' },
  { title: '직원호출' },
];

export default function CallPage() {
  // useEffect(() => {
  //   const tag = document.getElementById('alertModal');
  //   tag.showModal();
  // }, []);

  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'직원호출'} />
      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.title}>요청 항목을 선택해주세요</div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.middle}>
          {requestListArr.map((req, idx) => {
            const { title } = req;
            return <RequestButton key={idx} title={title} />;
          })}
        </div>
      </main>
      <SubmitButton />
      <AlertModal type={'empty'} />
    </div>
  );
}
