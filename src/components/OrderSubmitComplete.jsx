import styles from '@/style/OrderSubmitComplete.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

export default function OrderSubmitComplete() {
  // store
  const submitStatus = useBoundStore((state) => state.submitState.status);
  // variant
  const status = submitStatus === 'fulfilled' ? 'ok' : 'fail';
  const result = submitStatus === 'fulfilled' ? '완료' : '실패';
  const description =
    submitStatus === 'fulfilled'
      ? '정상적으로 접수되었어요, 조금만 기다려주세요!'
      : '정상적으로 접수되지 않았어요, 직원을 호출해주세요!';

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>
        주문이 <span className={styles[status]}>{result}</span>되었어요
      </h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
