import styles from '@/style/popup/Popup.module.css';
import CountButton from '../CountButton';

export default function Popup({ type, context }) {
  switch (type) {
    case 'pick':
    case 'request': {
      return (
        <div className={styles.wrap}>
          <div className={styles.top}>
            <div className={styles.title}>
              <span className={styles.context}>useSelector</span>
            </div>
            <CountButton />
          </div>
          <div className={styles.bottom}>
            <span className={styles.context}>{context}</span>
          </div>
        </div>
      );
    }
    default: {
      return (
        <div className={styles.wrap}>
          <div className={styles.bottom}>
            <span className={styles.context}>{context}</span>
          </div>
        </div>
      );
    }
  }
}
