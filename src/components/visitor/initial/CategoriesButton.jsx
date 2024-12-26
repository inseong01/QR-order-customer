import styles from '@/style/visitor/initial/CategoriesButton.module.css';
import { setRequestClick } from '@/lib/features/requestState/requestSlice';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function CategoriesButton() {
  // useSelector
  const tableNum = useSelector((state) => state.userState.tableNum);
  const requestIsClicked = useSelector((state) => state.requestState.isClicked);
  // useDispatch
  const dispatch = useDispatch();
  // useRouter
  const router = useRouter();

  function onClickRouterOnce(category) {
    return () => {
      if (requestIsClicked) return;
      dispatch(setRequestClick({ isClicked: true }));
      router.push(`${tableNum}/${category}`);
    };
  }

  return (
    <ul className={styles.categories}>
      <li className={styles.cate} onClick={onClickRouterOnce('call')}>
        <span className={styles.icon}>
          <Image src="/img/bell.webp" alt="직원호출" width={15} height={15} />
        </span>
        <span className={styles.title}>직원호출</span>
      </li>
      <li className={styles.cate} onClick={onClickRouterOnce('orderList')}>
        <span className={styles.icon}>
          <Image src="/img/bullet-list.webp" alt="주문내역" width={15} height={15} />
        </span>
        <span className={styles.title}>주문내역</span>
      </li>
      <li className={styles.cate} onClick={onClickRouterOnce('bill')}>
        <span className={styles.icon}>
          <Image src="/img/won.webp" alt="계산서" width={15} height={15} />
        </span>
        <span className={styles.title}>계산서</span>
      </li>
    </ul>
  );
}
