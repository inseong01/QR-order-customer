import styles from '@/style/AlertModal.module.css';

export default function AlertModal({ type }) {
  switch (type) {
    case 'orderCheck': {
      return (
        <dialog id="alertModal" className={styles.wrap}>
          <div className={styles.top}>주문하시겠습니까?</div>
          <div className={styles.bottom}>
            <span className={styles.title}>아니요</span>
            <span className={styles.title}>예</span>
          </div>
        </dialog>
      );
    }
    case 'requested': {
      return (
        <dialog id="alertModal" className={styles.wrap}>
          <div className={styles.top}>요청되었습니다</div>
          <div className={styles.bottom}>
            <span className={`${styles.title} ${styles.last}`}>확인</span>
          </div>
        </dialog>
      );
    }
    case 'empty': {
      return (
        <div className={`${styles.wrap} ${styles.error}`}>
          <span className={styles.msg}>항목을 골라주세요</span>
        </div>
      );
    }
  }
}
