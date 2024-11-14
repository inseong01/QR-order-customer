import styles from '@/style/visitor/orderList/OrderListPage.module.css';
import OrderList from '@/components/OrderList';
import AppVisitorHeader from '@/components/AppVisitorHeader';

const orderListArr = [
  {
    title: '첫번째 주문',
  },
  {
    title: '두번째 주문',
  },
  {
    title: '세번째 주문',
  },
  {
    title: '네번째 주문',
  },
  {
    title: '다섯번째 주문',
  },
  {
    title: '여섯번째 주문',
  },
];
export default function OrderListPage() {
  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'주문내역'} />
      <ul className={`${styles.listWrap}`}>
        {orderListArr.map((list, idx) => {
          const { title } = list;
          return (
            <li key={idx} className={`${styles.list}`}>
              <div className={styles.top}>
                <div className={styles.title}>{title}</div>
                <div className={styles.line}></div>
              </div>
              <OrderList type={'orderList'} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
