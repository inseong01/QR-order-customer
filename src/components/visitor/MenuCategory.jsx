'use client';

import styles from '@/style/visitor/MenuCategory.module.css';
import { getSelectedMenuCategoryKey } from '@/lib/features/menuState/menuSlice';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function MenuCategory({ category }) {
  // useState
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // useSelector
  const selectedTagKey = useSelector((state) => state.menuState.selectedMenuCategoryKey);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  function onClickChangeMenuTitle(category) {
    return () => {
      if (selectedTagKey === category.key) return;
      dispatch(getSelectedMenuCategoryKey({ key: category.key }));
      return;
    };
  }

  return (
    <div className={`swiper-slide`} onClick={onClickChangeMenuTitle(category)}>
      <div className={`${styles.titleWrap}`}>
        <span className={styles.title}>{category.title}</span>
      </div>
      {isFirstLoad ||
        (selectedTagKey === category.key && (
          <motion.div className={styles.underline} layoutId="underline"></motion.div>
        ))}
    </div>
  );
}
