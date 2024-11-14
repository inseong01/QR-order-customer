import styles from '@/style/AppVisitorHeader.module.css';
import Image from 'next/image';

export default function AppVisitorHeader({ title }) {
  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.nav}>
          <Image src={'/img/back-button.png'} alt={'이전'} width={15} height={15} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </header>
  );
}
