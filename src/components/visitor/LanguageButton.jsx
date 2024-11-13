import styles from '@/style/visitor/LanguageButton.module.css';
import Image from 'next/image';

export default function LanguageButton() {
  return (
    <li className={styles.lang}>
      <div className={styles.country}>
        <Image src={'/img/korea-flag.png'} alt="대한민국 국기" width={15} height={15} />
      </div>
      <div className={styles.context}>한국어</div>
      <div className={styles.nav}>
        <Image src={'/img/down-arrow.png'} alt="아랫 방향 화살표" width={10} height={10} />
      </div>
    </li>
  );
}
