'use client';

import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMenuCategory,
  changeMenuList,
  getSelectedMenuCategoryIdx,
} from '@/lib/features/menuState/menuSlice';
import styles from '@/style/visitor/MenuTitleList.module.css';
import Swiper from 'swiper';
import 'swiper/css';
import { motion } from 'motion/react';

function MenuTitleList() {
  const menuCategoryListArr = useSelector((state) => state.menuState.menuCategoryList);
  const selectedTagKey = useSelector((state) => state.menuState.selectedMenuCategoryKey);
  const menuCategory = useSelector((state) => state.menuState.menuCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    new Swiper('.menuTitleList', {
      slidesPerView: 2,
      spaceBetween: 30,
      resistanceRatio: 0.5,
      breakpoints: {
        360: {
          slidesPerView: 4,
        },
      },
    });
  }, []);

  function onClickChangeMenuTitle(category) {
    return () => {
      if (selectedTagKey === category.key) return;
      dispatch(getSelectedMenuCategoryIdx({ key: category.key }));
      dispatch(changeMenuCategory({ title: category.title }));
      dispatch(changeMenuList({ title: category.title }));
      return;
    };
  }
  return (
    <div className={`menuTitleList ${styles.menuTitleList}`}>
      <div className={`swiper-wrapper ${styles['swiper-wrapper']}`}>
        {menuCategoryListArr.map((category, idx) => {
          const { title, key } = category;
          return (
            <div key={key} className={`swiper-slide`} onClick={onClickChangeMenuTitle(category)}>
              <div className={`${styles.titleWrap}`}>
                <span className={styles.title}>{title}</span>
              </div>
              {selectedTagKey === idx && (
                <motion.div className={styles.underline} layoutId="underline"></motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(MenuTitleList);
