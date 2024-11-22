import styles from '@/style/visitor/MenuCateoryTitleList.module.css';
import fetchMenuData from '@/function/firebase/fetchMenuData';
import MenuCategory from './MenuCategory';

import 'swiper/css';
import Swiper from 'swiper';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

function MenuCateoryTitleList() {
  // useQuery
  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: () => fetchMenuData('menu/category'),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 2,
      spaceBetween: 30,
      resistanceRatio: 0.5,
      breakpoints: {
        360: {
          slidesPerView: 4,
        },
      },
    });

    return () => {
      swiper.destroy();
    };
  }, [data]);

  return (
    <>
      {data && (
        <motion.div
          className={`swiper-container ${styles.cateoryList}`}
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
        >
          <div className={`swiper-wrapper ${styles['swiper-wrapper']}`}>
            {data.map((category, idx) => {
              return <MenuCategory key={idx} category={category} />;
            })}
          </div>
        </motion.div>
      )}
    </>
  );
}

export default MenuCateoryTitleList;
