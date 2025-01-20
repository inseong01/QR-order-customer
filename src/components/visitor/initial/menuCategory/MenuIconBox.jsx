import styles from '@/style/visitor/initial/menuCategory/MenuIconBox.module.css';
import { addMenuToPickUpList, deletePickUpList } from '@/lib/features/pickUpState/pickUpSlice';
import PlusMinusIcon from '@/components/SimpleIcon';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MenuIconBox({ list }) {
  // useSelector
  const currentOrderList = useSelector((state) => state.pickUpState.list);
  // useState
  const [isIconClicked, setIsIconClicked] = useState(false);
  // useDispatch
  const dispatch = useDispatch();
  // variant
  const isPickedItem = currentOrderList.some((order) => order.id === list.id);

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

  function onClickIconAddMenuInPickUpList({ name, price, id, tag }) {
    if (tag === 'soldout') return;
    dispatch(addMenuToPickUpList({ menu: { name, price, amount: 1, id } }));
  }

  function onClickIconRemoveMenuInPickUpList({ id, tag }) {
    if (tag === 'soldout') return;
    dispatch(deletePickUpList({ id }));
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
