import styles from '@/style/visitor/initial/CategoriesButton.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
          <Image src={'/img/hotel-bell.webp'} width={13} height={13} alt="request" />
        </div>
        <span className={styles.title}>직원호출</span>
      </li>
      <li className={styles.cate} onClick={onClickRouterOnce('orderList')}>
        <div className={styles.icon}>
          <Image src={'/img/list.webp'} width={13} height={13} alt="list" />
        </div>
        <span className={styles.title}>주문내역</span>
      </li>
      <li className={styles.cate} onClick={onClickRouterOnce('bill')}>
        <div className={styles.icon}>
          <Image src={'/img/invoice.webp'} width={13} height={13} alt="bill" />
        </div>
        <span className={styles.title}>계산서</span>
      </li>
    </ul>
  );
}
