import { menu_parents } from "@/lib/motion/display-menu/menu-variants";
import { menuListQueryOption } from "@/lib/function/useQuery/query-option";
import { useBoundStore } from "@/lib/store/use-bound-store";
import { MenuList } from "@/types/common";
import Item from "./menu-item";

import { ReactNode, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

export default function MenuDisplay() {
  const { data, isFetched } = useSuspenseQuery(menuListQueryOption);

  const currentCategoryId = useBoundStore((state) => state.categoryState.id);

  const currentCategoryMenu = data.filter(selectedCategoryMenu);
  function selectedCategoryMenu(list: MenuList) {
    return list.sortId === currentCategoryId;
  }

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
  const isfirstLoad = useMemo(() => isFetched, [isFetched]);
  const orderList = useBoundStore((state) => state.orderState.list);
  const isMenuClicked = useBoundStore((state) => state.orderState.isClicked);

  const isSubmitButtonAppeared = isMenuClicked || !!orderList.length;

  return (
    <motion.ul
      className={`w-full ${isSubmitButtonAppeared ? `h-lvh` : "h-auto"} flex flex-col gap-1 py-4`}
      variants={menu_parents}
      initial={isfirstLoad ? "inactive" : false}
      animate={isfirstLoad ? "active" : false}
    >
      {children}
    </motion.ul>
  );
}
