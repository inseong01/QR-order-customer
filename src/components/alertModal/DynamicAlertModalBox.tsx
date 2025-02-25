import { useBoundStore } from '@/lib/store/useBoundStore';

import { AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';

const DynamicAlertModal = dynamic(() => import('@/components/alertModal/AlertModal'));

export default function DynamicAlertModalBox() {
  // DynamicAlertModal 인자 type 제외해봄
  // const type = useBoundStore((state) => state.modalState.type);
  const isOpenModal = useBoundStore((state) => state.modalState.isOpen);

  return <AnimatePresence>{isOpenModal && <DynamicAlertModal key={'AlertModal'} />}</AnimatePresence>;
}
