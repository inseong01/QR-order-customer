import styles from '@/style/CountButton.module.css';

export default function CountButton() {
  return (
    <div className={styles.btnWrap}>
      <div className={styles.count}>
        <span className={styles.context}>+</span>
      </div>
      <div className={styles.number}>
        <span className={styles.context}>1</span>
      </div>
      <div className={styles.count}>
        <span className={styles.context}>-</span>
      </div>
    </div>
  );
}
