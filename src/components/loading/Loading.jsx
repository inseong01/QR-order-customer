'use client';

import { useBoundStore } from '@/lib/store/useBoundStore';
import styles from '@/style/loading/Loading.module.css';

export default function Loading({ type }) {
  const isBtnClicked = useBoundStore((state) => state.requestState.isClicked);

  switch (type) {
    // 링크 이동 투명 배경
    case 'link': {
      return (
        <>
          {isBtnClicked && (
            <div className={`${styles.bg} ${styles.op}`}>
              <div className={styles.loaderBox}>
                <div className={styles.loader}></div>
              </div>
            </div>
          )}
        </>
      );
    }
    // 첫 로딩은 하얀 배경
    case 'init': {
      return (
        <div className={styles.bg}>
          <div className={styles.loaderBox}>
            <div className={styles.loader}></div>
          </div>
        </div>
      );
    }
    // 이외 로딩은 x
    default: {
      return;
    }
  }
}
