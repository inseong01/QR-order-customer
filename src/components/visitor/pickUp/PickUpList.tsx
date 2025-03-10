import styles from '@/style/visitor/pickUpList/PickUpList.module.css';
import CountButton from '@/components/CountButton';
import { OrderListType } from '@/types/common';

export default function PickUpList({
  currentOrderList,
  onClickDeleteList,
}: {
  currentOrderList: OrderListType[];
  onClickDeleteList: (id: string) => () => void;
}) {
  return (
    <>
      {currentOrderList.map((list, idx) => {
        const { name, price, amount, id } = list;
        const priceToString = price.toLocaleString();
        return (
          <li key={idx} className={styles.list}>
            <div className={styles.middle}>
              <div className={styles.top}>
                <div className={styles.name}>{name}</div>
                <div className={styles.price}>{priceToString}원</div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.deleteBtn} onClick={onClickDeleteList(id)}>
                  빼기
                </div>
                <CountButton type={'pickUpList'} amount={amount} id={id} />
              </div>
            </div>
            <div className={styles.line}></div>
          </li>
        );
      })}
    </>
  );
}
