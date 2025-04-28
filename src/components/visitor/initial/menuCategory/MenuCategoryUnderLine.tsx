import { useBoundStore } from '@/lib/store/useBoundStore';
import { MenuCategoryList } from '@/types/common';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function MenuCategoryUnderLine({
  category,
}: {
  category: MenuCategoryList;
}) {
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
        <motion.div
          className={
            'h-[1px] absolute w-[calc(100%-24px)] bg-[#222] -bottom-[1px] left-[12px]'
          }
          layoutId='underline'
        ></motion.div>
      )}
    </>
  );
}
