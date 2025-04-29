import { useBoundStore } from "@/lib/store/useBoundStore";
import { child } from "@/lib/motion/call/motion_requestList";
import { RequestCategoryList } from "@/types/common";

import { motion } from "motion/react";
import { memo } from "react";

function Request({
  req,
  isIncludedItem,
}: {
  req: RequestCategoryList;
  isIncludedItem: boolean;
}) {
  // store
  const selectCallBtn = useBoundStore((state) => state.selectCallBtn);
  // variant
  const { title } = req;

  function onClickSelect({
    id,
    title,
  }: {
    id: RequestCategoryList["id"];
    title: RequestCategoryList["title"];
  }) {
    return () => {
      selectCallBtn({ id, title, amount: 1 });
    };
  }

  return (
    <motion.div
      className={`flex h-15 min-w-[140px] flex-1 cursor-pointer items-center justify-center rounded border-[1px] border-[#e6e6e6] ${isIncludedItem ? "bg-[#4caff8]! text-white!" : ""}`}
      onClick={onClickSelect(req)}
      variants={child}
      whileTap={{
        scale: 0.85,
        backgroundColor: "#4caff8",
        color: "rgb(255, 255, 255)",
        transition: { duration: 0.7 },
      }}
    >
      <div>{title}</div>
    </motion.div>
  );
}

export default memo(Request);
