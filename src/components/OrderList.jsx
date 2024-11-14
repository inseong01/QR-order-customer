import styles from '@/style/OrderList.module.css';

const menuListArr = [
  {
    name: '음식 이름 1',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    amount: 2,
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    amount: 2,
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    amount: 2,
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    amount: 2,
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    amount: 2,
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    amount: 2,
    price: '00,000',
  },
  {
    name: '음식 이름 1',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 2',
    amount: 1,
    price: '00,000',
  },
  {
    name: '음식 이름 3',
    amount: 2,
    price: '00,000',
  },
];

export default function OrderList({ type }) {
  // type을 받아서 type 조건에 맞는 dispatch 실행, menuList 받아옴
  switch (type) {
    case 'orderList': {
      return (
        <div className={styles.wrap}>
          <div className={styles.top}>
            <ul className={styles.listBox}>
              {menuListArr.map((menu, idx) => {
                const { name, amount, price } = menu;
                return (
                  <li key={idx} className={styles.list}>
                    <div className={styles.menuBox}>
                      <div className={styles.name}>{name}</div>
                      <div className={styles.amount}>x {amount}</div>
                    </div>
                    <div className={styles.price}>{price}원</div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.line}></div>
          <div className={styles.bottom}>
            <div className={styles.name}>결제금액</div>
            <div className={styles.price}>0원</div>
          </div>
        </div>
      );
    }
    default: {
      return (
        <div className={styles.includeMsg}>
          <div className={styles.wrap}>
            <div className={styles.top}>
              <ul className={styles.listBox}>
                {menuListArr.map((menu, idx) => {
                  const { name, amount, price } = menu;
                  return (
                    <li key={idx} className={styles.list}>
                      <div className={styles.menuBox}>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.amount}>x {amount}</div>
                      </div>
                      <div className={styles.price}>{price}원</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.line}></div>
            <div className={styles.bottom}>
              <div className={styles.name}>결제금액</div>
              <div className={styles.price}>0원</div>
            </div>
          </div>
          <p className={styles.msg}>
            <span>결제는 후불결제입니다.</span>
            <span>현재 앉아 계신 테이블 번호는 N번 입니다.</span>
          </p>
        </div>
      );
    }
  }
}
