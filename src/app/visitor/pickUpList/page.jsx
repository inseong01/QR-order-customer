'use client';

import styles from '@/style/visitor/pickUpList/PickUpList.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import CountButton from '@/components/CountButton';
import SubmitButton from '@/components/SubmitButton';
import OrderSubmit from '@/components/orderSubmit';
import OrderList from '@/components/OrderList';
import AlertModal from '@/components/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { calculateAmountInPickUpList, deletePickUpList } from '@/lib/features/requestState/pickUpSlice';
import { useEffect } from 'react';
import { changeModalId } from '@/lib/features/submitState/submitSlice';

export default function PickUpListPage() {
  const submitStatus = useSelector((state) => state.submitState.status);
  const currentOrderList = useSelector((state) => state.pickUpState.list);
  const target = useSelector((state) => state.submitState.modal.target);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeModalId({ target: 'orderCheck' }));
  }, []);

  function onClickdeletePickUpList(idx) {
    return () => {
      dispatch(deletePickUpList({ idx }));
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
              {currentOrderList.length !== 0 ? (
                <>
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
                              <div className={styles.deleteBtn} onClick={onClickdeletePickUpList(idx)}>
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
                </>
              ) : (
                <li>주문 목록이 없습니다.</li>
              )}
            </ul>
          </main>
          <SubmitButton type={currentOrderList.length !== 0 ? 'order' : 'back'} />
          <AlertModal type={target} />
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
