import styles from '@/style/visitor/initial/MenuList.module.css';
import { ulVariants } from '@/lib/motion/middle/motion_menuList';
import { menuListQueryOption } from '@/lib/function/useQuery/queryOption';
import Menu from './Menu';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { useSuspenseQuery } from '@tanstack/react-query';

function MenuList() {
  // useState
  const [isfirstLoad, setIsFirstLoad] = useState(true);
  // useSelector
  const currentCategoryTitle = useSelector((state) => state.menuState.selectedMenuCategoryTitle);
  // useSuspenseQuery
  const { data, isFetched } = useSuspenseQuery(menuListQueryOption);

  useEffect(() => {
    if (!isFetched) return;
    setIsFirstLoad(isFetched);
  }, [isFetched]);

  return (
    <motion.ul
      className={`menuList ${styles.menuList}`}
      variants={ulVariants}
      initial={isfirstLoad ? 'inactive' : false}
      animate={isfirstLoad ? 'active' : false}
    >
      {isFetched &&
        data
          .filter((list) => list.sort === currentCategoryTitle)
          .map((list, idx) => {
            return <Menu key={idx} list={list} />;
          })}
    </motion.ul>
  );
}

export default MenuList;
