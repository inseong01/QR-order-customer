import styles from '@/style/visitor/initial/menuCategory/MenuCategory.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import MenuCategoryUnderLine from './MenuCategoryUnderLine';

function CategoryComponent({ category, children, onClickChangeMenuTitle }) {
  return (
    <div className={styles.category} onClick={onClickChangeMenuTitle}>
      <div className={`${styles.titleWrap}`}>
        <span className={styles.title}>{category.title}</span>
      </div>
      {children}
    </div>
  );
}
export default function MenuCategory({ category }) {
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
