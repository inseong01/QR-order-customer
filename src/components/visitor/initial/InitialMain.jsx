import styles from '@/style/visitor/initial/InitialMain.module.css';
import MenuCateoryTitleList from './menuCategory/MenuCateoryTitleList';
import MenuList from './MenuList';

import { memo } from 'react';

function InitialMain() {
  return (
    <main className={styles.main}>
      <MenuCateoryTitleList />
      <MenuList />
    </main>
  );
}

export default memo(InitialMain);
