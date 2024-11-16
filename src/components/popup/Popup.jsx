'use client';

import styles from '@/style/popup/Popup.module.css';
import CountButton from '../CountButton';
import { useDispatch, useSelector } from 'react-redux';
import { pickUpMenu, resetPickUpState } from '@/lib/features/requestState/pickUpSlice';
import { useRouter } from 'next/navigation';
import { countNumber } from '@/lib/features/countNumberState/countNumberSlice';

export default function Popup({ type, context }) {
  const selectedMenu = useSelector((state) => state.pickUpState.selectedMenu);
  const pickUpLists = useSelector((state) => state.pickUpState.list);
  const dispatch = useDispatch();
  const router = useRouter();

  function onClickList() {
    switch (type) {
      case 'pick': {
        dispatch(pickUpMenu());
        return;
      }
      case 'request': {
        console.log('click request');
        return;
      }
    }
  }
  function onSubmitOrderMenuLists(e) {
    e.preventDefault();
    console.log('submit', pickUpLists);
    // 주문 전송
    // 주문 결과
    router.push('visitor/pickUpList');
    dispatch(resetPickUpState());
  }
  switch (type) {
    case 'pick': {
      return (
        <div className={styles.wrap} onClick={() => {}}>
          <div className={styles.top}>
            <div className={styles.title}>
              <span className={styles.context}>{selectedMenu.name}</span>
            </div>
            <CountButton />
          </div>
          <div className={styles.bottom} onClick={onClickList}>
            <span className={styles.context}>{context}</span>
          </div>
        </div>
      );
    }
    case 'order': {
      return (
        <form className={styles.wrap} onSubmit={onSubmitOrderMenuLists}>
          <button type="submit" className={`${styles.bottom} ${styles.submitBtn}`}>
            <span className={styles.context}>{context}</span>
          </button>
        </form>
      );
    }
  }
}
