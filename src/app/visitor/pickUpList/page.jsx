import styles from '@/style/visitor/pickUpList/PickUpList.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import CountButton from '@/components/CountButton';
import SubmitButton from '@/components/SubmitButton';
import OrderSubmit from '@/components/orderSubmit';
import OrderList from '@/components/OrderList';

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
// swiper 적용 안 해도 되는지
// 리스트 최대 height 넘겨서 UI 테스트

export default function PickUpListPage() {
  const isSubmit = false;

  switch (isSubmit) {
    case false: {
      return (
        <div className={styles.wrap}>
          <AppVisitorHeader title={'주문표'} />
          <main className={styles.main}>
            <div className={styles.titleBox}>
              <div className={styles.title}>주문표 목록</div>
              <div className={styles.line}></div>
            </div>
            <ul className={`${styles.pickUpLists}`}>
              {pickUpListsArr.map((list, idx) => {
                const { name, price } = list;
                return (
                  <li key={idx} className={``}>
                    <div className={styles.list}>
                      <div className={styles.middle}>
                        <div className={styles.top}>
                          <div className={styles.name}>{name}</div>
                          <div className={styles.price}>{price}원</div>
                        </div>
                        <div className={styles.bottom}>
                          <div className={styles.deleteBtn}>빼기</div>
                          <CountButton />
                        </div>
                      </div>
                      <div className={styles.line}></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </main>
          {/* <SubmitButton type={'order'} /> */}
        </div>
      );
    }
    case true: {
      return (
        <div className={styles.wrap}>
          <AppVisitorHeader title={'주문완료'} />
          <main className={styles.main}>
            <OrderSubmit />
            <OrderList />
          </main>
          <SubmitButton type={'back'} />
        </div>
      );
    }
  }
}
