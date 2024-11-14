import styles from '@/style/OrderSubmit.module.css';

export default function OrderSubmit() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>
        주문이 <span className={styles.submitState}>완료</span>되었어요
      </h1>
      <p className={styles.description}>궁금한 점이 있으시면 직원호출을 눌러주세요.</p>
    </div>
  );
}
