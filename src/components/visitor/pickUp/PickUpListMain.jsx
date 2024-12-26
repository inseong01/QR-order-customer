import NotCompletedOrder from './NotCompletedOrder';
import CompletedOrder from './CompletedOrder';

import { memo } from 'react';
import { AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';

function PickUpListMain() {
  // useSelector
  const submitStatus = useSelector((state) => state.submitState.status);

  return (
    <AnimatePresence mode="popLayout">
      {submitStatus !== 'fulfilled' ? <NotCompletedOrder /> : <CompletedOrder />}
    </AnimatePresence>
  );
}

export default PickUpListMain;
