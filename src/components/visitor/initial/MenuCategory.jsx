import styles from '@/style/visitor/initial/MenuCategory.module.css';
import { getSelectedMenuCategoryTitle } from '@/lib/features/menuState/menuSlice';

import { useDispatch, useSelector } from 'react-redux';
import MenuCategoryUnderLine from './MenuCategoryUnderLine';

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
    <div className={styles.category} onClick={onClickChangeMenuTitle}>
      <div className={`${styles.titleWrap}`}>
        <span className={styles.title}>{category.title}</span>
      </div>
      <MenuCategoryUnderLine category={category} />
    </div>
  );
}
