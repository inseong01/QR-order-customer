import { useBoundStore } from '@/lib/store/useBoundStore';

import { AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';

const DynamicAlertModal = dynamic(() => import('@/components/alertModal/AlertModal'));

export default function DynamicAlertModalBox() {
  const isOpenModal = useBoundStore((state) => state.modalState.isOpen);

  return <AnimatePresence>{isOpenModal && <DynamicAlertModal key={'AlertModal'} />}</AnimatePresence>;
}
