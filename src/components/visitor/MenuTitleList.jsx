'use client';

import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMenuCategory,
  changeMenuList,
  getSelectedMenuCategoryIdx,
} from '@/lib/features/menuState/menuSlice';
import styles from '@/style/visitor/MenuTitleList.module.css';
import Swiper from 'swiper';
import 'swiper/css';

function MenuTitleList() {
  const menuCategoryListArr = useSelector((state) => state.menuState.menuCategoryList);
  const selectedTagIdx = useSelector((state) => state.menuState.selectedMenuCategoryIdx);
  const menuCategory = useSelector((state) => state.menuState.menuCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    new Swiper('.menuTitleList', {
      slidesPerView: 2,
      spaceBetween: 30,
      resistanceRatio: 0.5,
      breakpoints: {
        360: {
          slidesPerView: 4,
        },
      },
    });
  }, []);

  function onClickChangeMenuTitle(e) {
    const innerText = e.target.innerText;
    if (menuCategory === innerText) return;
    const tags = document.getElementsByClassName('swiper-slide');
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].innerText === innerText) {
        dispatch(getSelectedMenuCategoryIdx({ idx: i }));
        break;
      }
    }
    dispatch(changeMenuCategory({ category: innerText }));
    dispatch(changeMenuList({ category: innerText }));
    return;
  }
  return (
    <div className={`menuTitleList ${styles.menuTitleList}`}>
      <div className={`swiper-wrapper ${styles['swiper-wrapper']}`}>
        {menuCategoryListArr.map((category, idx) => {
          const { title } = category;
          return (
            <div key={idx} className={`swiper-slide`} onClick={onClickChangeMenuTitle}>
              <div className={`${styles.titleWrap} ${selectedTagIdx === idx ? styles.clicked : ''}`}>
                <span className={styles.title}>{title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(MenuTitleList);
