import styles from '@/style/SubmitButton.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

import Link from 'next/link';

export default function SubmitBack() {
  const tableName = useBoundStore((state) => state.tableState.tableName);

  return (
    <div className={styles.wrap}>
      <Link href={`/${tableName}`} replace={true} className={styles.bottom}>
        돌아가기
      </Link>
    </div>
  );
}
