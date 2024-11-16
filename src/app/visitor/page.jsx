'use client';

import Popup from '@/components/popup/Popup';
import InitialHeader from '@/components/visitor/InitialHeader';
import InitialMain from '@/components/visitor/InitialMain';
import styles from '@/style/visitor/VisitorPage.module.css';
import { useSelector } from 'react-redux';

function Page() {
  const isClicked = useSelector((state) => state.pickUpState.isClicked);
  const pickUpList = useSelector((state) => state.pickUpState.list);
  const pickUp = useSelector((state) => state.pickUpState); // /visitor 리렌더링 원인
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

export default Page;
