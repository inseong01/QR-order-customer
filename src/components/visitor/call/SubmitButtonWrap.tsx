import SubmitButton from '@/components/SubmitButton';
import { useBoundStore } from '@/lib/store/useBoundStore';

import { AnimatePresence } from 'motion/react';

export default function SubmitButtonWrap() {
  const isClicked = useBoundStore((state) => state.callState.isClicked);

  return (
    <AnimatePresence>{isClicked && <SubmitButton key={'SubmitButton'} type={'request'} />}</AnimatePresence>
  );
}
