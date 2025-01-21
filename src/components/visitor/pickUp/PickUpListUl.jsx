import styles from '@/style/visitor/pickUpList/PickUpListUl.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import CountButton from '../../CountButton';

export default function PickUpListUl() {
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);
  const removePickUpMenu = useBoundStore((state) => state.removePickUpMenu);

  function onClickdeletePickUpList(id) {
    return () => {
      removePickUpMenu({ id });
    };
  }

  return (
    <ul className={`${styles.pickUpLists}`}>
      {currentOrderList.length !== 0 ? (
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
                    <div className={styles.deleteBtn} onClick={onClickdeletePickUpList(id)}>
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
      ) : (
        <li>주문 목록이 없습니다.</li>
      )}
    </ul>
  );
}
