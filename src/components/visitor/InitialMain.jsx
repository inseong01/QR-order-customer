import styles from '@/style/visitor/InitialMain.module.css';
import MenuTitleList from './MenuTitleList';
import MenuList from './MenuList';

export default function InitialMain() {
  return (
    <main className={styles.main}>
      <MenuTitleList />
      <MenuList />
    </main>
  );
}
