import SubmitButton from '@/components/SubmitButton';

import { AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';

export default function SubmitButtonWrap() {
  const isClicked = useSelector((state) => state.callState.isClicked);

  return (
    <AnimatePresence>{isClicked && <SubmitButton key={'SubmitButton'} type={'request'} />}</AnimatePresence>
  );
}
