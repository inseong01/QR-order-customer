import styles from '@/style/visitor/initial/menuCategory/MenuCategoryUnderLine.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function MenuCategoryUnderLine({ category }) {
  // useState
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // store
  const selectedTagId = useBoundStore((state) => state.menuState.selectedMenuCategoryId);

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
