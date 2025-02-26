import styles from '@/style/visitor/initial/menuCategory/MenuIconBox.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import PlusMinusIcon from '@/components/SimpleIcon';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

export default function MenuIconBox({ list }) {
  // store
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);
  const pickUpMenu = useBoundStore((state) => state.pickUpMenu);
  const removePickUpMenu = useBoundStore((state) => state.removePickUpMenu);
  // useState
  const [isIconClicked, setIsIconClicked] = useState(false);
  // variant
  const isPickedItem = currentOrderList.some((order) => order.id === list.id);

  function onClickIcon(list, isPickedItem) {
    return (e) => {
      e.stopPropagation();
      const { tag } = list;
      if (tag === 'soldout' || isIconClicked) return;
      switch (isPickedItem) {
        case true: {
          onClickMinusIcon(list);
          return;
        }
        case false: {
          onClickPlusIcon(list);
          return;
        }
      }
    };
  }

  function onClickPlusIcon({ name, price, id, tag }) {
    if (tag === 'soldout') return;
    const menu = { name, price, amount: 1, id };
    pickUpMenu(menu);
  }

  function onClickMinusIcon({ id, tag }) {
    if (tag === 'soldout') return;
    removePickUpMenu({ id });
  }

  return (
    <div className={styles.shopIconWrap}>
      <div className={styles.iconBox} onClick={onClickIcon(list, isPickedItem)}>
        <AnimatePresence initial={false} mode="popLayout">
          {!isPickedItem ? (
            list.tag === 'soldout' ? (
              <div className={`${styles.shopIcon} ${styles.disabled}`}>
                <PlusMinusIcon type={'plus'} />
              </div>
            ) : (
              <motion.div
                className={styles.shopIcon}
                key={'plus'}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                exit={{ rotateY: 360 }}
                transition={{ duration: 0.3 }}
                onAnimationStart={() => setIsIconClicked(true)}
                onAnimationComplete={(status) => status.rotateY === 180 && setIsIconClicked(false)}
              >
                <PlusMinusIcon type={'plus'} />
              </motion.div>
            )
          ) : (
            <motion.div
              className={styles.shopIcon}
              key={'minus'}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 180 }}
              exit={{ rotateY: 360 }}
              transition={{ duration: 0.3 }}
              onAnimationStart={() => setIsIconClicked(true)}
              onAnimationComplete={(status) => status.rotateY === 180 && setIsIconClicked(false)}
            >
              <PlusMinusIcon type={'minus'} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
