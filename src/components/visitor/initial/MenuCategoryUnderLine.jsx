import styles from '@/style/visitor/initial/MenuCategory.module.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';

export default function MenuCategoryUnderLine({ category }) {
  // useState
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // useSelector
  const selectedTagTitle = useSelector((state) => state.menuState.selectedMenuCategoryTitle);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  return (
    <>
      {!isFirstLoad && selectedTagTitle === category.title && (
        <motion.div className={styles.underline} layoutId="underline"></motion.div>
      )}
    </>
  );
}
