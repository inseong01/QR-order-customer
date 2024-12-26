import styles from '@/style/SubmitButton.module.css';
import { resetPickUpState } from '@/lib/features/pickUpState/pickUpSlice';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

export default function SubmitBack() {
  // useSelector
  const tableNum = useSelector((state) => state.userState.tableNum);
  // dispatch
  const dispatch = useDispatch();

  // 돌아가기
  async function onClickReturnHome() {
    dispatch(resetPickUpState()); // 초기화
  }

  return (
    <div className={styles.wrap} onClick={onClickReturnHome}>
      <Link href={`/${tableNum}`} replace={true} className={styles.bottom}>
        돌아가기
      </Link>
    </div>
  );
}
