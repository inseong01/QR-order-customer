'use client';

import styles from '@/style/visitor/CategoriesButton.module.css';

import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function CategoriesButton() {
  // useSelector
  const tableNum = useSelector((state) => state.userState.tableNum);

  return (
    <ul className={styles.categories}>
      <li className={styles.cate}>
        <Link href={`${tableNum}/call`}>
          <span className={styles.icon}>
            <Image src="/img/bell.webp" alt="직원호출" width={15} height={15} />
          </span>
          <span className={styles.title}>직원호출</span>
        </Link>
      </li>
      <li className={styles.cate}>
        <Link href={`${tableNum}/orderList`}>
          <span className={styles.icon}>
            <Image src="/img/bullet-list.webp" alt="주문내역" width={15} height={15} />
          </span>
          <span className={styles.title}>주문내역</span>
        </Link>
      </li>
      <li className={styles.cate}>
        <Link href={`${tableNum}/bill`}>
          <span className={styles.icon}>
            <Image src="/img/won.webp" alt="계산서" width={15} height={15} />
          </span>
          <span className={styles.title}>계산서</span>
        </Link>
      </li>
    </ul>
  );
}
