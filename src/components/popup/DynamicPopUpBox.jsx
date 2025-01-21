import { useBoundStore } from '@/lib/store/useBoundStore';

import { AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';

const DynamicPopUp = dynamic(() => import('./Popup'));

export default function DynamicPopUpBox() {
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const pickUpIsClicked = useBoundStore((state) => state.pickUpState.isClicked);

  return (
    <AnimatePresence>
      {(pickUpList.length || pickUpIsClicked) && <DynamicPopUp key={'popUp'} />}
    </AnimatePresence>
  );
}
