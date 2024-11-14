import styles from '@/style/visitor/bill/BillPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import OrderList from '@/components/OrderList';

export default function BillPage() {
  return (
    <div className={styles.wrap}>
      <AppVisitorHeader title={'계산서'} />
      <main className={styles.main}>
        <OrderList />
      </main>
    </div>
  );
}
