'use client';

import Popup from '@/components/popup/Popup';
import InitialHeader from '@/components/visitor/InitialHeader';
import InitialMain from '@/components/visitor/InitialMain';
import styles from '@/style/visitor/VisitorPage.module.css';
import { useSelector } from 'react-redux';

export default function Page() {
  const isClicked = useSelector((state) => state.requestState.pickUp.isClicked);
  const pickUpList = useSelector((state) => state.requestState.pickUp.list);
  const pickUp = useSelector((state) => state.requestState.pickUp);
  const popUpTitle = pickUpList.length && !isClicked ? '주문하기' : '음식 담기';
  const popUpType = pickUpList.length && !isClicked ? 'order' : 'pick';
  console.log(pickUp);

  return (
    <div className={styles.wrap}>
      <InitialHeader />
      <InitialMain />
      {(pickUpList.length || isClicked) && <Popup type={popUpType} context={popUpTitle} />}
    </div>
  );
}
