import { ReactNode } from "react";

import { MenuCategoryList } from "@/types/common";
import { useBoundStore } from "@/lib/store/use-bound-store";
import CategoryUnderBar from "./category-mark";

export default function MenuCategory({
  category,
}: {
  category: MenuCategoryList;
}) {
  const currentCategoryId = useBoundStore((state) => state.categoryState.id);
  const selectMenuCategoryId = useBoundStore(
    (state) => state.selectMenuCategoryId,
  );

  function onClickChangeMenuTitle() {
    if (currentCategoryId === category.id) return;

    selectMenuCategoryId({ id: category.id });
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
