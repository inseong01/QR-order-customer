import styles from '@/style/visitor/initial/Menu.module.css';
import { liVariants } from '@/lib/motion/middle/motion_menuList';
import { useBoundStore } from '@/lib/store/useBoundStore';
import MenuImageBox from './menuCategory/MenuImageBox';
import MenuIconBox from './menuCategory/MenuIconBox';

import { motion } from 'motion/react';
import { memo } from 'react';

function Menu({ list }) {
  // store
  const clickMenu = useBoundStore((state) => state.clickMenu);
  // variant
  const { name, price, tag } = list;
  const priceToString = price.toLocaleString();

  let tagDescription = '';
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

  function onClickMenuClick(list) {
    return () => {
      if (tag === 'soldout') return;
      clickMenu(list);
    };
  }

  return (
    <motion.li
      className={`${styles.menu} ${styles[tag]}`}
      onClick={onClickMenuClick(list)}
      variants={liVariants}
    >
      <MenuImageBox list={list} tagDescription={tagDescription} />
      <div className={styles.contextWrap}>
        <div className={styles.content}>
          <div className={styles.name}>{name}</div>
          <div className={styles.price}>{priceToString}원</div>
        </div>
        <MenuIconBox list={list} />
      </div>
    </motion.li>
  );
}

export default memo(Menu);
