import styles from '@/style/visitor/call/CallPageMain.module.css';
import RequestListWrap from './RequestListWrap';

export default function CallPageMain() {
  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.title}>요청 항목을 선택해주세요</div>
        <div className={styles.line}></div>
      </div>
      <RequestListWrap />
    </main>
  );
}
