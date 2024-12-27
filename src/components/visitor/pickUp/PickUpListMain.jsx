import NotCompletedOrder from './NotCompletedOrder';
import CompletedOrder from './CompletedOrder';

import { AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';

export default function PickUpListMain() {
  // useSelector
  const submitStatus = useSelector((state) => state.submitState.status);

  return (
    <AnimatePresence mode="popLayout">
      {submitStatus !== 'fulfilled' ? <NotCompletedOrder /> : <CompletedOrder />}
    </AnimatePresence>
  );
}
