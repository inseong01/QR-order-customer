import styles from '@/style/SubmitButton.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

import Link from 'next/link';

export default function SubmitBack() {
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const resetPickUpState = useBoundStore((state) => state.resetPickUpState);
  const getSelectedMenuCategoryId = useBoundStore((state) => state.getSelectedMenuCategoryId);

  // 돌아가기
  async function onClickReturnHome() {
    // 선택 메뉴 초기화
    resetPickUpState();
    // 초기 카테고리 메뉴로 초기화
    getSelectedMenuCategoryId({ id: 1 });
  }

  return (
    <div className={styles.wrap} onClick={onClickReturnHome}>
      <Link href={`/${tableName}`} replace={true} className={styles.bottom}>
        돌아가기
      </Link>
    </div>
  );
}
