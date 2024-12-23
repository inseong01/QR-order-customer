import styles from '@/style/loading/Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loaderBox}>
      <div className={styles.loader}></div>
    </div>
  );
}
