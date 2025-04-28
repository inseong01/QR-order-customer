import { useBoundStore } from '@/lib/store/useBoundStore';
import PlusMinusIcon from '@/components/SimpleIcon';
import { MenuList } from '@/types/common';

import { AnimatePresence, motion } from 'motion/react';
import { MouseEvent, useState } from 'react';

export default function MenuIconBox({ list }: { list: MenuList }) {
  // store
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);
  const pickUpMenu = useBoundStore((state) => state.pickUpMenu);
  const removePickUpMenu = useBoundStore((state) => state.removePickUpMenu);
  // useState
  const [isIconClicked, setIsIconClicked] = useState(false);
  // variant
  const isPickedItem = currentOrderList.some((order) => order.id === list.id);

  function onClickIcon(list: MenuList, isPickedItem: boolean) {
    return (e: MouseEvent<HTMLDivElement>) => {
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

  function onClickPlusIcon({ name, price, id, tag }: MenuList) {
    if (tag === 'soldout') return;
    const menu = { name, price, amount: 1, id };
    pickUpMenu(menu);
  }

  function onClickMinusIcon({ id, tag }: MenuList) {
    if (tag === 'soldout') return;
    removePickUpMenu({ id });
  }

  return (
    <div className={'w-full flex justify-end'}>
      <div className={'w-5 h-5 relative'} onClick={onClickIcon(list, isPickedItem)}>
        <AnimatePresence initial={false} mode='popLayout'>
          {!isPickedItem ? (
            list.tag === 'soldout' ? (
              <div
                className={`'w-full h-full bg-white border-[1px] border-[#222] rounded-full' opacity-30`}
              >
                <PlusMinusIcon type={'plus'} />
              </div>
            ) : (
              <motion.div
                className={
                  'w-full h-full bg-white border-[1px] border-[#222] rounded-full'
                }
                key={'plus'}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                exit={{ rotateY: 360 }}
                transition={{ duration: 0.3 }}
                onAnimationStart={() => setIsIconClicked(true)}
                onAnimationComplete={() => setIsIconClicked(false)}
              >
                <PlusMinusIcon type={'plus'} />
              </motion.div>
            )
          ) : (
            <motion.div
              className={'w-full h-full bg-white border-[1px] border-[#222] rounded-full'}
              key={'minus'}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 180 }}
              exit={{ rotateY: 360 }}
              transition={{ duration: 0.3 }}
              onAnimationStart={() => setIsIconClicked(true)}
              onAnimationComplete={() => setIsIconClicked(false)}
            >
              <PlusMinusIcon type={'minus'} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
