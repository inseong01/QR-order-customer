import styles from '@/style/visitor/CategoriesButton.module.css';
import Image from 'next/image';

export default function CategoriesButton() {
  return (
    <ul className={styles.categories}>
      <li className={styles.cate}>
        <span className={styles.icon}>
          <Image src="/img/bell.png" alt="직원호출" width={15} height={15} />
        </span>
        <span className={styles.title}>직원호출</span>
      </li>
      <li className={styles.cate}>
        <span className={styles.icon}>
          <Image src="/img/bullet-list.png" alt="주문내역" width={15} height={15} />
        </span>
        <span className={styles.title}>주문내역</span>
      </li>
      <li className={styles.cate}>
        <span className={styles.icon}>
          <Image src="/img/won.png" alt="계산서" width={15} height={15} />
        </span>
        <span className={styles.title}>계산서</span>
      </li>
    </ul>
  );
}
