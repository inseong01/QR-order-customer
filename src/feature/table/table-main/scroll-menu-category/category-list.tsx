import { ReactNode } from "react";

import { MenuCategoryList } from "@/types/common";
import { useBoundStore } from "@/lib/store/useBoundStore";
import CategoryUnderBar from "./category-mark";

export default function MenuCategory({
  category,
}: {
  category: MenuCategoryList;
}) {
  const selectedTagId = useBoundStore(
    (state) => state.menuState.selectedMenuCategoryId,
  );
  const getSelectedMenuCategoryId = useBoundStore(
    (state) => state.getSelectedMenuCategoryId,
  );

  function onClickChangeMenuTitle() {
    if (selectedTagId === category.id) return;
    getSelectedMenuCategoryId({ id: category.id });
  }

  return (
    <MenuCategoryBox onClickChangeMenuTitle={onClickChangeMenuTitle}>
      <Category title={category.title} />
      <CategoryUnderBar category={category} />
    </MenuCategoryBox>
  );
}

function Category({ title }: { title: string }) {
  return (
    <div className={`relative w-full text-center`} data-id="menuCategory">
      <span className={"text-sm"}>{title}</span>
    </div>
  );
}

function MenuCategoryBox({
  children,
  onClickChangeMenuTitle,
}: {
  children: ReactNode;
  onClickChangeMenuTitle: () => void;
}) {
  return (
    <div
      className={
        "relative flex w-1/4 max-w-[230px] min-w-[145px] cursor-pointer items-center justify-center"
      }
      onClick={onClickChangeMenuTitle}
    >
      {children}
    </div>
  );
}
