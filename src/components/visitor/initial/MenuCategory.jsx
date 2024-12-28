import styles from '@/style/visitor/initial/MenuCategory.module.css';
import { getSelectedMenuCategoryTitle } from '@/lib/features/menuState/menuSlice';

import { useDispatch, useSelector } from 'react-redux';
import MenuCategoryUnderLine from './MenuCategoryUnderLine';

function Category({ category, children, onClickChangeMenuTitle }) {
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
  // useSelector
  const selectedTagTitle = useSelector((state) => state.menuState.selectedMenuCategoryTitle);
  // dispatch
  const dispatch = useDispatch();

  function onClickChangeMenuTitle() {
    if (selectedTagTitle === category.title) return;
    dispatch(getSelectedMenuCategoryTitle({ title: category.title }));
  }

  return (
    <Category category={category} onClickChangeMenuTitle={onClickChangeMenuTitle}>
      <MenuCategoryUnderLine category={category} />
    </Category>
  );
}
