'use client';

import styles from '@/style/visitor/MenuList.module.css';
import Image from 'next/image';
import { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css/bundle';

const menuListArr = [
  {
    name: '음식 이름 1',
    price: '00,000',
    tag: 'popular',
  },
  {
    name: '음식 이름 2',
    price: '00,000',
    tag: 'new',
  },
  {
    name: '음식 이름 3',
    price: '00,000',
    tag: 'soldout',
  },
  {
    name: '음식 이름 4',
    price: '00,000',
    tag: '',
  },
  {
    name: '음식 이름 5',
    price: '00,000',
    tag: '',
  },
  {
    name: '음식 이름 6',
    price: '00,000',
    tag: '',
  },
];

export default function MenuList() {
  useEffect(() => {
    const swiper = new Swiper('.menuList', {
      height: 348,
      direction: 'vertical',
      slidesPerView: 4,
      resistanceRatio: 0.5,
    });
  }, []);

  return (
    <div className={`menuList ${styles.menuList}`}>
      <ul className="swiper-wrapper">
        {menuListArr.map((list, idx) => {
          const { name, price, tag } = list;
          let tagDescription = '';
          switch (tag) {
            case 'popular': {
              tagDescription = '인기';
              break;
            }
            case 'new': {
              tagDescription = '신규';
              break;
            }
            case 'soldout': {
              tagDescription = '품절';
              break;
            }
          }
          return (
            <li key={idx} className="swiper-slide">
              <div className={`${styles.menu} ${styles[tag]}`}>
                <div className={styles.imgBox}>
                  <div className={styles.tag}>
                    <span className={styles.title}>{tagDescription}</span>
                  </div>
                </div>
                <div className={styles.contextWrap}>
                  <div className={styles.content}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.price}>{price}원</div>
                  </div>
                  <div className={styles.shopIconWrap}>
                    <div className={styles.shopIcon}>
                      <Image src={'/img/shopping-cart.png'} alt="장바구니" width={10} height={10} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
