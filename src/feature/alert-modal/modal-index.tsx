import { useBoundStore } from "@/lib/store/useBoundStore";

import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";

const DynamicAlertModal = dynamic(() => import("./modal-type"));

export default function AlertModal() {
  const isOpenModal = useBoundStore((state) => state.modalState.isOpen);

  return (
    <AnimatePresence>
      {isOpenModal && <DynamicAlertModal key={"AlertModal"} />}
    </AnimatePresence>
  );
}
