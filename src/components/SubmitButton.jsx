'use client';

import styles from '@/style/SubmitButton.module.css';
import CountButton from './CountButton';
import { useSelector } from 'react-redux';
import { countItemAmount } from '@/lib/features/requestState/callSlice';

const requestListArr = [
  { name: '숟저' },
  { name: '젓가락' },
  { name: '물' },
  { name: '앞치마' },
  { name: '직원호출' },
];
// useSelector 데이터 받아옴

function TotalPrice() {
  return (
    <div className={styles.totalPrice}>
      <div className={styles.title}>합계</div>
      <div className={styles.price}>0원</div>
    </div>
  );
}

function PickAndCountButton() {
  const selectedItemArr = useSelector((state) => state.callState.selectedItemArr);
  return (
    <div className={styles.pickAndCount}>
      <ul className={styles.pickList}>
        {selectedItemArr.map((item, idx) => {
          return (
            <li key={idx} className={styles.list}>
              <div className={styles.name}>{item.name}</div>
              {item.name !== '직원호출' && (
                <CountButton amount={item.amount} idx={idx} countFunction={countItemAmount} />
              )}
            </li>
          );
        })}
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
