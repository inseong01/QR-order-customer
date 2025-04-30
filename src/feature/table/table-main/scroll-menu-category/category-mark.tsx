import { useBoundStore } from "@/lib/store/useBoundStore";
import { MenuCategoryList } from "@/types/common";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CategoryUnderBar({
  category,
}: {
  category: MenuCategoryList;
}) {
  // useState
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // store
  const selectedTagId = useBoundStore(
    (state) => state.menuState.selectedMenuCategoryId,
  );

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  return <>{!isFirstLoad && selectedTagId === category.id && <UnderBar />}</>;
}

function UnderBar() {
  return (
    <motion.div
      className={
        "absolute -bottom-[1px] left-[12px] h-[1px] w-[calc(100%-24px)] bg-[#222]"
      }
      layoutId="underBar"
    ></motion.div>
  );
}
