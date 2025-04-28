import MenuCateoryTitleList from './menuCategory/MenuCateoryTitleList';
import MenuList from './MenuList';

import { memo } from 'react';

function InitialMain() {
  return (
    <main className={'w-full h-full bg-white relative'}>
      <MenuCateoryTitleList />
      <MenuList />
    </main>
  );
}

export default memo(InitialMain);
