'use client';

import onClickPush from '@/function/onClickPush';
import { resetPickUpState } from '@/lib/features/requestState/pickUpSlice';
import styles from '@/style/AppVisitorHeader.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function AppVisitorHeader({ title }) {
  const submitStatus = useSelector((state) => state.submitState.status);
  const router = useRouter();
  const dispatch = useDispatch();

  function navOnClickBack() {
    router.push('/visitor');
    if (submitStatus !== 'OK') return;
    dispatch(resetPickUpState());
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.nav} onClick={navOnClickBack}>
          <Image src={'/img/back-button.png'} alt={'이전'} width={15} height={15} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </header>
  );
}
