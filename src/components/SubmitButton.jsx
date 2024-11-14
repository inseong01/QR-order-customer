import styles from '@/style/SubmitButton.module.css';
import CountButton from './CountButton';

function TotalPrice() {
  return (
    <div className={styles.totalPrice}>
      <div className={styles.title}>합계</div>
      <div className={styles.price}>0원</div>
    </div>
  );
}

function PickAndCountButton() {
  return (
    <div className={styles.pickAndCount}>
      <ul className={styles.pickList}>
        <li className={styles.list}>
          <div className={styles.name}>1. 숟저</div>
          <CountButton />
        </li>
        <li className={styles.list}>
          <div className={styles.name}>2. 젓가락</div>
          <CountButton />
        </li>
      </ul>
    </div>
  );
}

export default function SubmitButton({ type }) {
  switch (type) {
    case 'order': {
      return (
        <div className={styles.wrap}>
          <div className={styles.top}>
            <TotalPrice />
          </div>
          <div className={styles.bottom}>주문하기</div>
        </div>
      );
    }
    case 'back': {
      return (
        <div className={styles.wrap}>
          <div className={styles.bottom}>돌아가기</div>
        </div>
      );
    }
    default: {
      return (
        <div className={styles.wrap}>
          <div className={styles.top}>
            <PickAndCountButton />
          </div>
          <div className={styles.bottom}>요청하기</div>
        </div>
      );
    }
  }
}
