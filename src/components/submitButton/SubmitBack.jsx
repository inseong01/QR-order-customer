import styles from '@/style/SubmitButton.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

import Link from 'next/link';

export default function SubmitBack() {
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const resetPickUpState = useBoundStore((state) => state.resetPickUpState);

  // 돌아가기
  async function onClickReturnHome() {
    resetPickUpState(); // 초기화
  }

  return (
    <div className={styles.wrap} onClick={onClickReturnHome}>
      <Link href={`/${tableNum}`} replace={true} className={styles.bottom}>
        돌아가기
      </Link>
    </div>
  );
}
