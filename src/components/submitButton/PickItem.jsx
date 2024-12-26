import styles from '@/style/submitButton/PickItem.module.css';
import CountButton from '../CountButton';

export default function PickItem({ item }) {
  return (
    <li className={styles.list}>
      <div className={styles.name}>{item.title}</div>
      {item.title !== '직원호출' && <CountButton type={'call'} amount={item.amount} id={item.id} />}
    </li>
  );
}
