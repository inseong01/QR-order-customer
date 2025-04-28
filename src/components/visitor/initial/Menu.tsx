import styles from '@/style/visitor/initial/Menu.module.css';
import { liVariants } from '@/lib/motion/middle/motion_menuList';
import { useBoundStore } from '@/lib/store/useBoundStore';
import { MenuList, TagDescription } from '@/types/common';
import MenuImageBox from './menuCategory/MenuImageBox';
import MenuIconBox from './menuCategory/MenuIconBox';

import { motion } from 'motion/react';
import { memo } from 'react';

function Menu({ list }: { list: MenuList }) {
  // store
  const clickMenu = useBoundStore((state) => state.clickMenu);
  // variant
  const { name, price, tag } = list;
  const priceToString = price.toLocaleString();

  let tagDescription: TagDescription = '';
  switch (tag) {
    case 'popular': {
      tagDescription = '인기';
      break;
    }
    case 'new': {
      tagDescription = '신규';
      break;
    }
    case 'soldout': {
      tagDescription = '품절';
      break;
    }
  }

  function onClickMenuClick() {
    if (tag === 'soldout') return;
    clickMenu(list);
  }

  return (
    <motion.li
      className={`w-full flex gap-2.5 py-2 px-4`}
      onClick={onClickMenuClick}
      variants={liVariants}
      data-tag={styles[tag]}
    >
      <MenuImageBox list={list} tagDescription={tagDescription} />
      <div
        className={
          'min-h-full flex flex-col justify-between cursor-pointer max-h-[60px] flex-1'
        }
      >
        <div className={'flex flex-col gap-0.5 text-sm'}>
          <span>{name}</span>
          <span>{priceToString}원</span>
        </div>
        <MenuIconBox list={list} />
      </div>
    </motion.li>
  );
}

export default memo(Menu);
