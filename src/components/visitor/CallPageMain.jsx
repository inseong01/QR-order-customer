'use client';

import { selectCallBtn } from '@/lib/features/requestState/callSlice';
import styles from '@/style/visitor/call/CallPageMain.module.css';
import { useDispatch, useSelector } from 'react-redux';

const requestListArr = [
  { name: '숟저' },
  { name: '젓가락' },
  { name: '물' },
  { name: '앞치마' },
  { name: '직원호출' },
];

export default function CallPageMain() {
  const selectedItemArr = useSelector((state) => state.callState.selectedItemArr);
  const dispatch = useDispatch();

  function onClickSelect(idx, name) {
    return () => {
      dispatch(selectCallBtn({ idx, name, amount: 1 }));
    };
  }

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.title}>요청 항목을 선택해주세요</div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.middle}>
        {requestListArr.map((req, idx) => {
          const { name } = req;
          const isIncludedItem = selectedItemArr.some((item) => item.idx === idx);
          return (
            <div
              key={idx}
              className={`${styles.btn} ${isIncludedItem ? styles.clicked : ''}`}
              onClick={onClickSelect(idx, name)}
            >
              <div className={styles.title}>{name}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
