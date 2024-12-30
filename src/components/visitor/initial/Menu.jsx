import styles from '@/style/visitor/initial/Menu.module.css';
import { clickMenu } from '@/lib/features/pickUpState/pickUpSlice';
import { liVariants } from '@/lib/motion/middle/motion_menuList';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import MenuImageBox from './menuCategory/MenuImageBox';
import MenuIconBox from './menuCategory/MenuIconBox';

export default memo(function Menu({ list }) {
  // dispatch
  const dispatch = useDispatch();
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

  function onClickMenuClick({ name, price, tag, id }) {
    return () => {
      if (tag === 'soldout') return;
      dispatch(clickMenu({ menuData: { name, price, tag, id } }));
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
        <div className={styles.shopIconWrap}>
          <MenuIconBox list={list} />
        </div>
      </div>
    </motion.li>
  );
});
