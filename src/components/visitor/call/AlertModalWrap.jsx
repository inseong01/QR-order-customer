import AlertModal from '@/components/AlertModal';

import { AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';

export default function AlertModalWrap() {
  // useSelector
  const target = useSelector((state) => state.submitState.modal.target);
  const modalStatus = useSelector((state) => state.submitState.modal.status);

  return <AnimatePresence>{modalStatus && <AlertModal key={'AlertModal'} type={target} />}</AnimatePresence>;
}
