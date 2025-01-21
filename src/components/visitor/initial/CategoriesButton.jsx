import styles from '@/style/visitor/initial/CategoriesButton.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBellConcierge, faList, faReceipt } from '@fortawesome/free-solid-svg-icons';

export default function CategoriesButton() {
  // store
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const requestIsClicked = useBoundStore((state) => state.requestState.isClicked);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);
  // useRouter
  const router = useRouter();

  function onClickRouterOnce(category) {
    return () => {
      if (requestIsClicked) return;
      setRequestClick({ isClicked: true });
      router.push(`${tableNum}/${category}`);
    };
  }

  return (
    <ul className={styles.categories}>
      <li className={styles.cate} onClick={onClickRouterOnce('call')}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faBellConcierge} />
        </div>
        <span className={styles.title}>직원호출</span>
      </li>
      <li className={styles.cate} onClick={onClickRouterOnce('orderList')}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faList} />
        </div>
        <span className={styles.title}>주문내역</span>
      </li>
      <li className={styles.cate} onClick={onClickRouterOnce('bill')}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faReceipt} />
        </div>
        <span className={styles.title}>계산서</span>
      </li>
    </ul>
  );
}
