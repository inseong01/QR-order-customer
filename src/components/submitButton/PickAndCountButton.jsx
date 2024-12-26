import styles from '@/style/submitButton/PickAndCountButton.module.css';
import PickItem from './PickItem';

import { useSelector } from 'react-redux';

export default function PickAndCountButton() {
  // useSelector
  const selectedItemArr = useSelector((state) => state.callState.selectedItemArr);

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
