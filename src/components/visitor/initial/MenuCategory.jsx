import styles from '@/style/visitor/initial/MenuCategory.module.css';
import { getSelectedMenuCategoryTitle } from '@/lib/features/menuState/menuSlice';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function MenuCategory({ category }) {
  // useState
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // useSelector
  const selectedTagTitle = useSelector((state) => state.menuState.selectedMenuCategoryTitle);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  function onClickChangeMenuTitle(category) {
    return () => {
      if (selectedTagTitle === category.title) return;
      dispatch(getSelectedMenuCategoryTitle({ title: category.title }));
      return;
    };
  }

  return (
    <div className={`swiper-slide`} onClick={onClickChangeMenuTitle(category)}>
      <div className={`${styles.titleWrap}`}>
        <span className={styles.title}>{category.title}</span>
      </div>
      {isFirstLoad ||
        (selectedTagTitle === category.title && (
          <motion.div className={styles.underline} layoutId="underline"></motion.div>
        ))}
    </div>
  );
}
