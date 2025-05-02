import { motion } from "motion/react";
import { ReactNode, useRef, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { categoryListQueryOption } from "@/lib/function/useQuery/query-option";
import useEnableScroll from "@/lib/hook/scroll-menu-category/use-enable-scroll";
import { measureCallbackElapsed } from "@/lib/function/measure/measure-callback-elapsed";
import MenuCategory from "./category-list";
import { CategoryList } from "@/types/common";

export default function ScrollMenuCateory() {
  return (
    <ScrollMenuCateoryBox>
      <MenuCategoryList />
    </ScrollMenuCateoryBox>
  );
}

function ScrollMenuCateoryBox({ children }: { children: ReactNode }) {
  // useState
  const [scrollStart, geScrollX] = useState({ x: 0, scrollX: 0 });
  // useRef
  const scrollContainer = useRef<HTMLDivElement>(null);
  // useSuspenseQuery
  const { data } = useSuspenseQuery(categoryListQueryOption);
  // hook
  const { isScrollAble } = useEnableScroll(scrollContainer);

  // 첫 드래그 감지
  function onDragStart(e: MouseEvent | DragEvent) {
    if (!scrollContainer.current) return;
    if (e) {
      geScrollX({ x: e.clientX, scrollX: scrollContainer.current.scrollLeft });
      // 사진 잔상 없애기
      const img = new Image();
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
      const event = e as DragEvent;
      event.dataTransfer?.setDragImage(img, 0, 0);
    }
  }

  // 드래그 스크롤 이동
  function onDragMouse(e: DragEvent) {
    if (!e) return;
    if (!scrollContainer.current) return;

    const lastX = e.clientX;
    const move = lastX - scrollStart.x;
    // 새로운 스크롤 위치
    const newScrollLeft = scrollStart.scrollX - move;
    // 최대 스크롤 가능 범위
    const maxScrollLeft =
      scrollContainer.current.scrollWidth - scrollContainer.current.offsetWidth;
    // 스크롤 위치가 스크롤 길이를 넘지 않도록 제한
    const scrollAmount = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
    requestAnimationFrame(() => {
      if (!scrollContainer.current) return;
      scrollContainer.current.scrollLeft = scrollAmount;
    });
  }

  function performanceOnDragStart(e: DragEvent) {
    // 성능 측정('production' 변경)
    if (process.env.NODE_ENV === "development") {
      measureCallbackElapsed(e, "throttle", scrollContainer.current);
    }
    onDragStart(e);
  }

  return (
    <>
      {data && (
        <motion.div
          ref={scrollContainer}
          className={
            "scrollbar-hidden relative flex h-10 w-full overflow-x-auto border-b-[1px] border-[#e6e6e6] bg-white px-2 pb-[1px]"
          }
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          draggable={isScrollAble}
          onDragStart={performanceOnDragStart}
          onDrag={onDragMouse}
          onDragEnd={onDragMouse}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}

function MenuCategoryList() {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData<CategoryList<"menu">>([
    "menuCategory",
  ]);

  return (
    <>
      {categoryList
        ?.filter((list) => list.id !== 0)
        .map((category, idx) => {
          return <MenuCategory key={idx} category={category} />;
        })}
    </>
  );
}
