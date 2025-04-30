import { ulVariants } from "@/lib/motion/middle/motion_menuList";
import { menuListQueryOption } from "@/lib/function/useQuery/queryOption";
import { useBoundStore } from "@/lib/store/useBoundStore";
import Item from "./menu-item";

import { ReactNode, useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

export default function MenuDisplay() {
  const { data, isFetched } = useSuspenseQuery(menuListQueryOption);
  const currentCategoryId = useBoundStore(
    (state) => state.menuState.selectedMenuCategoryId,
  );

  const currentCategoryMenu = data.filter(
    (list) => list.sortId === currentCategoryId,
  );

  return (
    <MainMenuBox isFetched={isFetched}>
      {isFetched &&
        currentCategoryMenu.map((list, idx) => <Item key={idx} list={list} />)}
    </MainMenuBox>
  );
}

function MainMenuBox({
  isFetched,
  children,
}: {
  isFetched: boolean;
  children: ReactNode;
}) {
  const [isfirstLoad, setIsFirstLoad] = useState(true);

  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const pickUpIsClicked = useBoundStore((state) => state.pickUpState.isClicked);
  const isOrderBoxAppeared = pickUpList.length !== 0 || pickUpIsClicked;

  useEffect(() => {
    if (!isFetched) return;
    setIsFirstLoad(isFetched);
  }, [isFetched]);

  return (
    <motion.ul
      className={`w-full ${isOrderBoxAppeared ? `h-lvh` : "h-auto"} flex flex-col gap-1 py-4`}
      variants={ulVariants}
      initial={isfirstLoad ? "inactive" : false}
      animate={isfirstLoad ? "active" : false}
    >
      {children}
    </motion.ul>
  );
}
