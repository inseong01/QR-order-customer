'use client';

import onClickPush from '@/function/onClickPush';
import styles from '@/style/visitor/CategoriesButton.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CategoriesButton() {
  const router = useRouter();

  return (
    <ul className={styles.categories}>
      <li className={styles.cate} onClick={onClickPush(router, 'visitor/call')}>
        <span className={styles.icon}>
          <Image src="/img/bell.png" alt="직원호출" width={15} height={15} />
        </span>
        <span className={styles.title}>직원호출</span>
      </li>
      <li className={styles.cate} onClick={onClickPush(router, 'visitor/orderList')}>
        <span className={styles.icon}>
          <Image src="/img/bullet-list.png" alt="주문내역" width={15} height={15} />
        </span>
        <span className={styles.title}>주문내역</span>
      </li>
      <li className={styles.cate} onClick={onClickPush(router, 'visitor/bill')}>
        <span className={styles.icon}>
          <Image src="/img/won.png" alt="계산서" width={15} height={15} />
        </span>
        <span className={styles.title}>계산서</span>
      </li>
    </ul>
  );
}
