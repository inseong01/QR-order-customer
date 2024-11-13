import Popup from '@/components/popup/Popup';
import InitialHeader from '@/components/visitor/InitialHeader';
import InitialMain from '@/components/visitor/InitialMain';
import styles from '@/style/visitorPage.module.css';

export default function Page() {
  return (
    <div className={styles.wrap}>
      <InitialHeader />
      <InitialMain />
      {/* <Popup type={'pick'} context={'음식 담기'} /> */}
    </div>
  );
}
