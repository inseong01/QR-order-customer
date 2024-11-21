'use client';

import styles from '@/style/AppVisitorHeader.module.css';
import { resetPickUpState } from '@/lib/features/requestState/pickUpSlice';

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

export default function AppVisitorHeader({ title }) {
  // useSelector
  const submitStatus = useSelector((state) => state.submitState.status);
  // dispatch
  const dispatch = useDispatch();

  function navOnClickBack() {
    if (submitStatus !== 'OK') return;
    dispatch(resetPickUpState());
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <Link href={'/visitor'} className={styles.nav}>
          <div onClick={navOnClickBack}>
            <Image src={'/img/back-button.png'} alt={'이전'} width={15} height={15} />
          </div>
        </Link>
        <div className={styles.title}>{title}</div>
      </div>
    </header>
  );
}
