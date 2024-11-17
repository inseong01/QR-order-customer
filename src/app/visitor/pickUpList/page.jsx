'use client';

import styles from '@/style/visitor/pickUpList/PickUpList.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import CountButton from '@/components/CountButton';
import SubmitButton from '@/components/SubmitButton';
import OrderSubmit from '@/components/orderSubmit';
import OrderList from '@/components/OrderList';
import { useDispatch, useSelector } from 'react-redux';
import { calculateAmountInPickUpList, deleteList } from '@/lib/features/requestState/pickUpSlice';

const pickUpListsArr = [
  {
    name: '음식 이름 1',
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    price: '00,000',
  },
];

export default function PickUpListPage() {
  const submitStatus = useSelector((state) => state.submitState.status);
  const currentOrderList = useSelector((state) => state.pickUpState.list);
  const dispatch = useDispatch();

  function onClickDeleteList(idx) {
    return () => {
      dispatch(deleteList({ idx }));
    };
  }

  switch (submitStatus) {
    case 'checkCurrentOrderList': {
      return (
        <div className={styles.wrap}>
          <AppVisitorHeader title={'주문표'} />
          <main className={styles.main}>
            <div className={styles.titleBox}>
              <div className={styles.title}>주문표 목록</div>
              <div className={styles.line}></div>
            </div>
            <ul className={`${styles.pickUpLists}`}>
              {currentOrderList.map((list, idx) => {
                const { name, price, amount } = list;
                const priceToString = price.toLocaleString();
                return (
                  <li key={idx} className={``}>
                    <div className={styles.list}>
                      <div className={styles.middle}>
                        <div className={styles.top}>
                          <div className={styles.name}>{name}</div>
                          <div className={styles.price}>{priceToString}원</div>
                        </div>
                        <div className={styles.bottom}>
                          <div className={styles.deleteBtn} onClick={onClickDeleteList(idx)}>
                            빼기
                          </div>
                          <CountButton
                            amount={amount}
                            idx={idx}
                            countFunction={calculateAmountInPickUpList}
                          />
                        </div>
                      </div>
                      <div className={styles.line}></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </main>
          <SubmitButton type={'order'} />
        </div>
      );
    }
    case 'OK': {
      return (
        <div className={styles.wrap}>
          <AppVisitorHeader title={'주문완료'} />
          <main className={styles.main}>
            <OrderSubmit />
            <OrderList type={'currentOrderList'} />
          </main>
          <SubmitButton type={'back'} />
        </div>
      );
    }
  }
}
