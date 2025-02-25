import styles from '@/style/visitor/initial/menuCategory/MenuCategory.module.css';
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
    <div className={styles.category} onClick={onClickChangeMenuTitle}>
      <div className={`${styles.titleWrap}`}>
        <span className={styles.title}>{category.title}</span>
      </div>
      {children}
    </div>
  );
}
export default function MenuCategory({ category }: { category: MenuCategoryList }) {
  const selectedTagId = useBoundStore((state) => state.menuState.selectedMenuCategoryId);
  const getSelectedMenuCategoryId = useBoundStore((state) => state.getSelectedMenuCategoryId);

  function onClickChangeMenuTitle() {
    if (selectedTagId === category.id) return;
    getSelectedMenuCategoryId({ id: category.id });
  }

  return (
    <CategoryComponent category={category} onClickChangeMenuTitle={onClickChangeMenuTitle}>
      <MenuCategoryUnderLine category={category} />
    </CategoryComponent>
  );
}
