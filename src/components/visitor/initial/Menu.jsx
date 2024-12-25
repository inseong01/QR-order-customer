import styles from '@/style/visitor/initial/Menu.module.css';
import { resetCountNumberState } from '@/lib/features/countNumberState/countNumberSlice';
import { clickMenu } from '@/lib/features/pickUpState/pickUpSlice';
import { liVariants } from '@/lib/motion/middle/motion_menuList';
import MenuIconWrap from './MenuIconWrap';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

function Menu({ list }) {
  // useSelector
  const currentOrderList = useSelector((state) => state.pickUpState.list);
  // dispatch
  const dispatch = useDispatch();
  // variant
  const { name, price, tag, id, url } = list;
  const priceToString = price.toLocaleString();
  const isPickedItem = currentOrderList.some((list) => list.id === id);

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
      dispatch(resetCountNumberState());
    };
  }

  function onClickImg(e) {
    e.stopPropagation();
    console.log('clicked');
  }

  return (
    <motion.li
      className={`${styles.menu} ${styles[tag]}`}
      onClick={onClickMenuClick(list)}
      variants={liVariants}
    >
      <div className={styles.imgBox} onClick={onClickImg}>
        <div className={styles.tag}>
          <span className={styles.title}>{tagDescription}</span>
        </div>
        <Image
          src={`https://onofrsiptqngmwfzenlr.supabase.co/storage/v1/object/public/qr-order-img/${url}`}
          alt={name}
          width={100}
          height={60}
          placeholder="blur"
          blurDataURL={`https://onofrsiptqngmwfzenlr.supabase.co/storage/v1/object/public/qr-order-img/${url}`}
          style={{
            objectFit: 'cover',
            filter: tag === 'soldout' ? 'opacity(0.5)' : 'opacity(1)',
          }}
        />
      </div>
      <div className={styles.contextWrap}>
        <div className={styles.content}>
          <div className={styles.name}>{name}</div>
          <div className={styles.price}>{priceToString}원</div>
        </div>
        <MenuIconWrap list={list} isPickedItem={isPickedItem} />
      </div>
    </motion.li>
  );
}

export default Menu;
