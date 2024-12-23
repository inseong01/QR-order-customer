'use client';

import styles from '@/style/visitor/MenuList.module.css';
import { resetCountNumberState } from '@/lib/features/countNumberState/countNumberSlice';
import { addMenuToPickUpList, clickMenu, deletePickUpList } from '@/lib/features/requestState/pickUpSlice';
import { liVariants, ulVariants } from '@/lib/motion/middle/motion_menuList';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

function MenuList({ data, isFetched }) {
  // useState
  const [isfirstLoad, setIsFirstLoad] = useState(true);
  const [isIconClicked, setIsIconClicked] = useState(false);
  // useSelector
  const currentCategoryTitle = useSelector((state) => state.menuState.selectedMenuCategoryTitle);
  const currentOrderList = useSelector((state) => state.pickUpState.list);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFetched) return;
    setIsFirstLoad(isFetched);
  }, [isFetched]);

  function onClickMenuClick({ name, price, tag, id }) {
    return () => {
      if (tag === 'soldout') return;
      dispatch(clickMenu({ menuData: { name, price, tag, id } }));
      dispatch(resetCountNumberState());
    };
  }

  function onClickIconAddMenuInPickUpList({ name, price, id, tag }) {
    if (tag === 'soldout') return;
    dispatch(addMenuToPickUpList({ menu: { name, price, amount: 1, id } }));
  }

  function onClickIconRemoveMenuInPickUpList({ id, tag }) {
    if (tag === 'soldout') return;
    dispatch(deletePickUpList({ id }));
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

  return (
    <motion.ul
      className={`menuList ${styles.menuList}`}
      variants={ulVariants}
      initial={isfirstLoad ? 'inactive' : false}
      animate={isfirstLoad ? 'active' : false}
    >
      {isFetched &&
        data
          .filter((list) => list.sort === currentCategoryTitle)
          .map((list, idx) => {
            const { name, price, tag, id, url } = list;
            const priceToString = price.toLocaleString();
            const isPickedItem = currentOrderList.some((list) => list.id === id);
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
                    src={`https://onofrsiptqngmwfzenlr.supabase.co/storage/v1/object/public/qr-order-img/${url}`}
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
                                src={'/img/error-border-icon.webp'}
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
                              <Image src={'/img/plus-border-icon.webp'} alt="담기" width={20} height={20} />
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
                            onAnimationComplete={(status) =>
                              status.rotateY === 180 && setIsIconClicked(false)
                            }
                          >
                            <Image src={'/img/minus-border-icon.webp'} alt="빼기" width={20} height={20} />
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
