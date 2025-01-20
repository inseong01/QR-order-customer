import styles from '@/style/visitor/initial/menuCategory/MenuCategoryUnderLine.module.css';
import { useBoundStroe } from '@/lib/store/useBoundStroe';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';

export default function MenuCategoryUnderLine({ category }) {
  // useState
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // useSelector
  const selectedTagId = useBoundStroe((state) => state.selectedMenuCategoryId);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  return (
    <>
      {!isFirstLoad && selectedTagId === category.id && (
        <motion.div className={styles.underline} layoutId="underline"></motion.div>
      )}
    </>
  );
}
