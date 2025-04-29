import styles from "@/style/visitor/call/RequestList.module.css";
import { parents } from "@/lib/motion/call/motion_requestList";
import { useBoundStore } from "@/lib/store/useBoundStore";
import { RequestCategoryList } from "@/types/common";
import Request from "./Request";

import { motion } from "motion/react";

export default function RequestList({
  data,
}: {
  data?: RequestCategoryList[];
}) {
  const selectedItemArr = useBoundStore(
    (state) => state.callState.selectedItemArr,
  );

  return (
    <motion.div
      className={"flex flex-wrap gap-2.5"}
      initial={"hidden"}
      animate={"visible"}
      variants={parents}
    >
      {data?.map((req, idx) => {
        const isIncludedItem = selectedItemArr.some(
          (item) => item.id === req.id,
        );
        return <Request key={idx} req={req} isIncludedItem={isIncludedItem} />;
      })}
    </motion.div>
  );
}
