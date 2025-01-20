import styles from '@/style/visitor/initial/menuCategory/MenuCategory.module.css';
import { getSelectedMenuCategoryTitle } from '@/lib/features/menuState/menuSlice';

import { useDispatch, useSelector } from 'react-redux';
import MenuCategoryUnderLine from './MenuCategoryUnderLine';
import { useBoundStroe } from '@/lib/store/useBoundStroe';

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
  // store
  const selectedTagId = useBoundStroe((state) => state.selectedMenuCategoryId);
  const getSelectedMenuCategoryId = useBoundStroe((state) => state.getSelectedMenuCategoryId);
  // dispatch
  const dispatch = useDispatch();

  function onClickChangeMenuTitle() {
    if (selectedTagId === category.id) return;
    // dispatch(getSelectedMenuCategoryTitle({ title: category.title }));
    getSelectedMenuCategoryId({ id: category.id });
  }

  return (
    <Category category={category} onClickChangeMenuTitle={onClickChangeMenuTitle}>
      <MenuCategoryUnderLine category={category} />
    </Category>
  );
}
