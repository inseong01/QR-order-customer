import { AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

const DynamicPopUp = dynamic(() => import('./Popup'));

export default function DynamicPopUpBox() {
  // useSelector
  const pickUpIsClicked = useSelector((state) => state.pickUpState.isClicked);
  const pickUpList = useSelector((state) => state.pickUpState.list);

  return (
    <AnimatePresence>
      {(pickUpList.length || pickUpIsClicked) && <DynamicPopUp key={'popUp'} />}
    </AnimatePresence>
  );
}
