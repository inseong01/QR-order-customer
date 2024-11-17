'use client';

import styles from '@/style/popup/Popup.module.css';
import CountButton from '../CountButton';
import { useDispatch, useSelector } from 'react-redux';
import { pickUpMenu } from '@/lib/features/requestState/pickUpSlice';
import { useRouter } from 'next/navigation';
import { changeSubmitStatus } from '@/lib/features/submitState/submitSlice';

export default function Popup({ type }) {
  const selectedMenu = useSelector((state) => state.pickUpState.selectedMenu);
  const selectedMenuAmount = useSelector((state) => state.pickUpState.selectedMenu.amount);
  const dispatch = useDispatch();
  const router = useRouter();

  // 항목 선택
  function onClickList() {
    dispatch(pickUpMenu());
  }
  // 주문표 확인하기
  function onClickCheckPickUpList() {
    dispatch(changeSubmitStatus({ status: 'checkCurrentOrderList' }));
    router.push('visitor/pickUpList');
  }
  switch (type) {
    case 'pick': {
      return (
        <div className={styles.wrap} onClick={() => {}}>
          <div className={styles.top}>
            <div className={styles.title}>
              <span className={styles.context}>{selectedMenu.name}</span>
            </div>
            <CountButton amount={selectedMenuAmount} />
          </div>
          <div className={styles.bottom} onClick={onClickList}>
            <span className={styles.context}>음식 담기</span>
          </div>
        </div>
      );
    }
    case 'order': {
      return (
        <div className={styles.wrap} onClick={onClickCheckPickUpList}>
          <div className={styles.bottom}>
            <span className={styles.context}>주문표 확인하기</span>
          </div>
        </div>
      );
    }
  }
}
