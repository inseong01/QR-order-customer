import styles from '@/style/visitor/InitialHeader.module.css';
import LanguageButton from './LanguageButton';
import CategoriesButton from './CategoriesButton';

export default function InitialHeader() {
  return (
    <header className={styles.header}>
      <ul className={styles.top}>
        <li className={styles.service}>QR Order</li>
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
