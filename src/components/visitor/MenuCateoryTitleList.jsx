import styles from '@/style/visitor/MenuCateoryTitleList.module.css';
import MenuCategory from './MenuCategory';
import { categoryListQueryOption } from '@/lib/function/useQuery/queryOption';

import 'swiper/css';
import Swiper from 'swiper';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

function MenuCateoryTitleList({ data }) {
  useEffect(() => {
    if (!data) return;

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
            {data
              .filter((list) => list.id !== 0)
              .map((category, idx) => {
                return <MenuCategory key={idx} category={category} />;
              })}
          </div>
        </motion.div>
      )}
    </>
  );
}

export default MenuCateoryTitleList;
