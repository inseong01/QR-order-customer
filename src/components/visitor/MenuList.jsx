'use client';

import styles from '@/style/visitor/MenuList.module.css';
import fetchMenuData from '@/function/firebase/fetchMenuData';
import { resetCountNumberState } from '@/lib/features/countNumberState/countNumberSlice';
import { addMenuToPickUpList, clickMenu, deletePickUpList } from '@/lib/features/requestState/pickUpSlice';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

function MenuList() {
  // useState
  const [isfirstLoad, setIsFirstLoad] = useState(true);
  const [isIconClicked, setIsIconClicked] = useState(false);
  // useSelector
  const currentCategoryKey = useSelector((state) => state.menuState.selectedMenuCategoryKey);
  const currentOrderList = useSelector((state) => state.pickUpState.list);
  // dispatch
  const dispatch = useDispatch();
  useQuery;
  const { data, isLoading } = useQuery({
    queryKey: ['menuList'],
    queryFn: () => fetchMenuData('menu/list'),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!data) return;
    setIsFirstLoad(false);
  }, [data]);

  function onClickMenuClick({ name, price, tag, key }) {
    return () => {
      if (tag === 'soldout') return;
      dispatch(clickMenu({ menuData: { name, price, tag, key } }));
      dispatch(resetCountNumberState());
    };
  }

  function onClickIconAddMenuInPickUpList({ name, price, key, tag }) {
    if (tag === 'soldout') return;
    dispatch(addMenuToPickUpList({ menu: { name, price, amount: 1, key } }));
  }

  function onClickIconRemoveMenuInPickUpList({ key, tag }) {
    if (tag === 'soldout') return;
    dispatch(deletePickUpList({ key }));
  }

  function onClickIcon(list, isPickedItem) {
    return (e) => {
      e.stopPropagation();
      const { tag } = list;
      if (tag === 'soldout' || isIconClicked) return;
      switch (isPickedItem) {
        case true: {
          onClickIconRemoveMenuInPickUpList(list);
          return;
        }
        case false: {
          onClickIconAddMenuInPickUpList(list);
          return;
        }
      }
    };
  }

  function onClickImg(e) {
    e.stopPropagation();
    console.log('clicked');
  }

  // motion
  const ulVariants = {
    active: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
    inactive: {},
  };
  const liVariants = {
    active: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    inactive: {
      y: -10,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (isLoading)
    return (
      <div className={styles.loaderBox}>
        <div className={styles.loader}></div>
      </div>
    );

  return (
    <motion.ul
      className={`menuList ${styles.menuList}`}
      variants={ulVariants}
      initial={isfirstLoad ? 'inactive' : false}
      animate={isfirstLoad ? 'active' : false}
    >
      {data[currentCategoryKey] &&
        data[currentCategoryKey].map((list, idx) => {
          const { name, price, tag, key, img } = list;
          const priceToString = price.toLocaleString();
          const isPickedItem = currentOrderList.some((list) => list.key === key);
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
            <motion.li
              key={idx}
              className={`${styles.menu} ${styles[tag]}`}
              onClick={onClickMenuClick(list)}
              variants={liVariants}
            >
              <div className={styles.imgBox} onClick={onClickImg}>
                <div className={styles.tag}>
                  <span className={styles.title}>{tagDescription}</span>
                </div>
                <Image
                  src={img}
                  alt={name}
                  width={100}
                  height={60}
                  priority={true}
                  style={{
                    objectFit: 'cover',
                    filter: tag === 'soldout' ? 'opacity(0.5)' : 'opacity(1)',
                  }}
                />
              </div>
              <div className={styles.contextWrap}>
                <div className={styles.content}>
                  <div className={styles.name}>{name}</div>
                  <div className={styles.price}>{priceToString}원</div>
                </div>
                <div className={styles.shopIconWrap}>
                  <div className={styles.iconBox} onClick={onClickIcon(list, isPickedItem)}>
                    <AnimatePresence>
                      {!isPickedItem ? (
                        tag === 'soldout' ? (
                          <div className={styles.shopIcon}>
                            <Image
                              src={'/img/error-border-icon.png'}
                              alt="담기"
                              width={20}
                              height={20}
                              style={{ filter: 'opacity(0.3)' }}
                            />
                          </div>
                        ) : (
                          <motion.div
                            className={styles.shopIcon}
                            key={'plus'}
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: 180 }}
                            exit={{ rotateY: 0 }}
                            onAnimationStart={() => setIsIconClicked(true)}
                            onAnimationComplete={(status) =>
                              status.rotateY === 180 && setIsIconClicked(false)
                            }
                          >
                            <Image src={'/img/plus-border-icon.png'} alt="담기" width={20} height={20} />
                          </motion.div>
                        )
                      ) : (
                        <motion.div
                          className={styles.shopIcon}
                          key={'minus'}
                          initial={{ rotateY: 0 }}
                          animate={{ rotateY: 180 }}
                          exit={{ rotateY: 0 }}
                          onAnimationStart={() => setIsIconClicked(true)}
                          onAnimationComplete={(status) => status.rotateY === 180 && setIsIconClicked(false)}
                        >
                          <Image src={'/img/minus-border-icon.png'} alt="빼기" width={20} height={20} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.li>
          );
        })}
    </motion.ul>
  );
}

export default MenuList;
