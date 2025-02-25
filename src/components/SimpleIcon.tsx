import styles from '@/style/SimpleIcon.module.css';
import { IconType } from '@/types/common';

export default function SimpleIcon({ type }: { type: IconType }) {
  switch (type) {
    case 'arrow-left': {
      return (
        <div className={styles.iconBox}>
          <span className={styles.arw}></span>
        </div>
      );
    }
    case 'plus': {
      return (
        <div className={styles.iconBox}>
          <span className={styles.vert}></span>
          <span className={styles.horz}></span>
        </div>
      );
    }
    case 'minus': {
      return (
        <div className={styles.iconBox}>
          <span className={styles.horz}></span>
        </div>
      );
    }
  }
}
