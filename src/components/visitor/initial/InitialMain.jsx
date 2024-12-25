import styles from '@/style/visitor/initial/InitialMain.module.css';
import { categoryListQueryOption, menuListQueryOption } from '@/lib/function/useQuery/queryOption';
import MenuCateoryTitleList from './MenuCateoryTitleList';
import Loading from '../../loading/Loading';
import MenuList from './MenuList';

import { useSuspenseQueries } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';

function InitialMain() {
  // useState
  const [screenLoading, setLoading] = useState(true);
  // useSuspenseQueries;
  const [menuList, categoryList] = useSuspenseQueries({
    queries: [menuListQueryOption, categoryListQueryOption],
  });

  // 로딩 여부
  useEffect(() => {
    if (!menuList.isFetched || !categoryList.isFetched) return;
    setLoading(false);
  }, [menuList.isFetched, categoryList.isFetched]);

  return (
    <main className={styles.main}>
      {screenLoading ? (
        <Loading />
      ) : (
        <>
          <MenuCateoryTitleList />
          <MenuList />
        </>
      )}
    </main>
  );
}

export default memo(InitialMain);
