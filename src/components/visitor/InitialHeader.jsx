import styles from '@/style/visitor/InitialHeader.module.css';
import LanguageButton from './LanguageButton';
import CategoriesButton from './CategoriesButton';

import Image from 'next/image';

export default function InitialHeader() {
  return (
    <header className={styles.header}>
      <ul className={styles.top}>
        <li className={styles.service}>
          <Image src={'/img/qr-order-icon.webp'} alt="qr order" width={88} height={15} />
        </li>
        <LanguageButton />
      </ul>
      <div className={styles.middle}>
        <div className={styles.restaurantName}>희락카츠</div>
        <div className={styles.description}>주문하실 음식을 골라주세요</div>
      </div>
      <CategoriesButton />
    </header>
  );
}
