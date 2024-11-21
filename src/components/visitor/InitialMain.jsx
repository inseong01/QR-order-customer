import styles from '@/style/visitor/InitialMain.module.css';
import MenuCateoryTitleList from './MenuCateoryTitleList';
import MenuList from './MenuList';

export default function InitialMain() {
  return (
    <main className={styles.main}>
      <MenuCateoryTitleList />
      <MenuList />
    </main>
  );
}
