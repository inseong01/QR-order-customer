'use client';

import styles from '@/style/SubmitButton.module.css';
import CountButton from './CountButton';
import { useDispatch, useSelector } from 'react-redux';
import { countItemAmount, resetCallState } from '@/lib/features/requestState/callSlice';
import { useRouter } from 'next/navigation';
import {
  asyncFetchOrderList,
  asyncFetchRequestList,
  changeModalTarget,
  resetSubmitState,
} from '@/lib/features/submitState/submitSlice';
import { resetPickUpState } from '@/lib/features/requestState/pickUpSlice';
import { addOrderList } from '@/lib/features/requestState/orderListSlice';

const requestListArr = [
  { name: '숟저' },
  { name: '젓가락' },
  { name: '물' },
  { name: '앞치마' },
  { name: '직원호출' },
];
// useSelector 데이터 받아옴

function TotalPrice() {
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const totalPrice = pickUpList.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
  const totalPriceToString = totalPrice.toLocaleString();
  return (
    <div className={styles.totalPrice}>
      <div className={styles.title}>합계</div>
      <div className={styles.price}>{totalPriceToString}원</div>
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
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const requestList = useSelector((state) => state.callState.selectedItemArr);
  const router = useRouter();
  const dispatch = useDispatch();

  // 돌아가기
  function onClickReturnHome() {
    // 초기화
    dispatch(resetPickUpState());
    dispatch(resetSubmitState());
    router.push('/visitor', { scroll: false });
  }
  // 주문하기
  function onClickSubmitOrderList() {
    dispatch(addOrderList({ list: pickUpList }));
    dispatch(asyncFetchOrderList(pickUpList));
  }
  // 호출하기
  function onClickSubmitRequestList() {
    dispatch(asyncFetchRequestList(requestList));
    // 초기화
    dispatch(resetCallState());
  }

  switch (type) {
    case 'back': {
      return (
        <div className={styles.wrap} onClick={onClickReturnHome}>
          <div className={styles.bottom}>돌아가기</div>
        </div>
      );
    }
    case 'order': {
      return (
        <div className={styles.wrap}>
          <div className={styles.top}>
            <TotalPrice />
          </div>
          <div className={styles.bottom} onClick={onClickSubmitOrderList}>
            주문하기
          </div>
        </div>
      );
    }
    case 'request': {
      return (
        <div className={styles.wrap}>
          <div className={styles.top}>
            <PickAndCountButton />
          </div>
          <div className={styles.bottom} onClick={onClickSubmitRequestList}>
            요청하기
          </div>
        </div>
      );
    }
  }
}
