'use client';

import onClickPush from '@/function/onClickPush';
import styles from '@/style/AppVisitorHeader.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AppVisitorHeader({ title }) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.nav} onClick={onClickPush(router, 'back')}>
          <Image src={'/img/back-button.png'} alt={'이전'} width={15} height={15} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </header>
  );
}
