import styles from '@/style/submitButton/PickAndCountButton.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import PickItem from './PickItem';

export default function PickAndCountButton() {
  const selectedItemArr = useBoundStore((state) => state.callState.selectedItemArr);

  return (
    <div className={styles.pickAndCount}>
      <ul className={styles.pickList}>
        {selectedItemArr.map((item, idx) => {
          return <PickItem key={idx} item={item} />;
        })}
      </ul>
    </div>
  );
}
