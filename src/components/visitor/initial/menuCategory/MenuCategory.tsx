import { useBoundStore } from '@/lib/store/useBoundStore';
import { MenuCategoryList } from '@/types/common';
import MenuCategoryUnderLine from './MenuCategoryUnderLine';

import { ReactNode } from 'react';

function CategoryComponent({
  category,
  children,
  onClickChangeMenuTitle,
}: {
  category: MenuCategoryList;
  children: ReactNode;
  onClickChangeMenuTitle: () => void;
}) {
  return (
    <div
      className={
        'flex justify-center items-center relative cursor-pointer w-1/4 max-w-[230px] min-w-[145px]'
      }
      onClick={onClickChangeMenuTitle}
    >
      <div className={`w-full relative text-center`} data-id='menuCategory'>
        <span className={'text-sm'}>{category.title}</span>
      </div>
      {children}
    </div>
  );
}
export default function MenuCategory({ category }: { category: MenuCategoryList }) {
  const selectedTagId = useBoundStore((state) => state.menuState.selectedMenuCategoryId);
  const getSelectedMenuCategoryId = useBoundStore(
    (state) => state.getSelectedMenuCategoryId
  );

  function onClickChangeMenuTitle() {
    if (selectedTagId === category.id) return;
    getSelectedMenuCategoryId({ id: category.id });
  }

  return (
    <CategoryComponent
      category={category}
      onClickChangeMenuTitle={onClickChangeMenuTitle}
    >
      <MenuCategoryUnderLine category={category} />
    </CategoryComponent>
  );
}
