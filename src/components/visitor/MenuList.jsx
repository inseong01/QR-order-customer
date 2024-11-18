'use client';

import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { resetCountNumberState } from '@/lib/features/countNumberState/countNumberSlice';
import { addMenuToPickUpList, clickMenu } from '@/lib/features/requestState/pickUpSlice';
import styles from '@/style/visitor/MenuList.module.css';
import Image from 'next/image';

function MenuList() {
  const menuStateMenuList = useSelector((state) => state.menuState.menuList);
  const [isfirstLoad, setIsFirstLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFirstLoad((prev) => (prev = false));
  }, []);

  function onClickMenuClick(name, price, tagDescription) {
    return () => {
      if (tagDescription === '품절') return;
      dispatch(clickMenu({ menuData: { name, price } }));
      dispatch(resetCountNumberState());
    };
  }

  function onClickAddMenuToPickUpList(name, price, tagDescription) {
    return (e) => {
      if (tagDescription === '품절') return;
      e.stopPropagation();
      dispatch(addMenuToPickUpList({ menu: { name, price, amount: 1 } }));
    };
  }

  // motion
  const ulVar = {
    active: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    inactive: {},
  };
  const liVar = {
    active: {
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    inactive: {
      y: 10,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.ul
      className={`menuList ${styles.menuList}`}
      variants={ulVar}
      initial={isfirstLoad ? 'inactive' : false}
      animate={isfirstLoad ? 'active' : false}
    >
      {menuStateMenuList.map((list, idx) => {
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
        return (
          <motion.li
            key={idx}
            className={`${styles.menu} ${styles[tag]}`}
            onClick={onClickMenuClick(name, price, tagDescription)}
            variants={liVar}
          >
            <div className={styles.imgBox}>
              <div className={styles.tag}>
                <span className={styles.title}>{tagDescription}</span>
              </div>
            </div>
            <div className={styles.contextWrap}>
              <div className={styles.content}>
                <div className={styles.name}>{name}</div>
                <div className={styles.price}>{priceToString}원</div>
              </div>
              <div className={styles.shopIconWrap}>
                <div
                  className={styles.shopIcon}
                  onClick={onClickAddMenuToPickUpList(name, price, tagDescription)}
                >
                  <Image src={'/img/shopping-cart.png'} alt="장바구니" width={10} height={10} />
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export default memo(MenuList);
