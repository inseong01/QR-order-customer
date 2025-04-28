import { ulVariants } from '@/lib/motion/middle/motion_menuList';
import { menuListQueryOption } from '@/lib/function/useQuery/queryOption';
import { useBoundStore } from '@/lib/store/useBoundStore';
import Menu from './Menu';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function MenuList() {
  // useState
  const [isfirstLoad, setIsFirstLoad] = useState(true);
  // store
  const currentCategoryId = useBoundStore(
    (state) => state.menuState.selectedMenuCategoryId
  );
  // useSuspenseQuery
  const { data, isFetched } = useSuspenseQuery(menuListQueryOption);

  useEffect(() => {
    if (!isFetched) return;
    setIsFirstLoad(isFetched);
  }, [isFetched]);

  return (
    <motion.ul
      className={`menuList w-full flex flex-col gap-1 py-4`}
      variants={ulVariants}
      initial={isfirstLoad ? 'inactive' : false}
      animate={isfirstLoad ? 'active' : false}
    >
      {isFetched &&
        data
          .filter((list) => list.sortId === currentCategoryId)
          .map((list, idx) => {
            return <Menu key={idx} list={list} />;
          })}
    </motion.ul>
  );
}
