import styles from '@/style/RequestButton.module.css';

export default function RequestButton({ title }) {
  return (
    <div className={`${styles.wrap}`}>
      <div className={styles.title}>{title}</div>
    </div>
  );
}
