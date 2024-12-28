import { AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

const DynamicAlertModal = dynamic(() => import('@/components/alertModal/AlertModal'));

export default function DynamicAlertModalBox() {
  // useSelector
  const target = useSelector((state) => state.submitState.modal.target);
  const modalStatus = useSelector((state) => state.submitState.modal.status);

  return (
    <AnimatePresence>{modalStatus && <DynamicAlertModal key={'AlertModal'} type={target} />}</AnimatePresence>
  );
}
