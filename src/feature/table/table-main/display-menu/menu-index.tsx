import { menu_parents } from "@/lib/motion/display-menu/menu-variants";
import { menuListQueryOption } from "@/lib/function/useQuery/query-option";
import { useBoundStore } from "@/lib/store/use-bound-store";
import Item from "./menu-item";

import { ReactNode, useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

export default function MenuDisplay() {
  const { data, isFetched } = useSuspenseQuery(menuListQueryOption);
  const currentCategoryId = useBoundStore((state) => state.categoryState.id);

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

  const pickUpList = useBoundStore((state) => state.orderState.list);
  const pickUpIsClicked = useBoundStore((state) => state.orderState.isClicked);
  const isOrderBoxAppeared = pickUpList.length !== 0 || pickUpIsClicked;

  useEffect(() => {
    if (!isFetched) return;
    setIsFirstLoad(isFetched);
  }, [isFetched]);

  return (
    <motion.ul
      className={`w-full ${isOrderBoxAppeared ? `h-lvh` : "h-auto"} flex flex-col gap-1 py-4`}
      variants={menu_parents}
      initial={isfirstLoad ? "inactive" : false}
      animate={isfirstLoad ? "active" : false}
    >
      {children}
    </motion.ul>
  );
}
