import styles from '@/style/visitor/initial/menuCategory/MenuCateoryTitleList.module.css';
import { categoryListQueryOption } from '@/lib/function/useQuery/queryOption';
import { throttle } from '@/lib/function/throttle';
import { measureCallbackCount } from '@/lib/function/measureCallbackCount';
import useEnableScroll from '@/lib/hook/useEnableScroll';
import MenuCategoryList from './MenuCategoryList';

import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function MenuCateoryTitleList() {
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
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      const event = e as DragEvent;
      event.dataTransfer?.setDragImage(img, 0, 0);
    }
  }

  // 드래그 스크롤 이동
  function onDragMouse(e: DragEvent) {
    if (!e) return;
    if (scrollContainer.current) {
      const lastX = e.clientX;
      const move = lastX - scrollStart.x;
      // 새로운 스크롤 위치
      const newScrollLeft = scrollStart.scrollX - move;
      // 최대 스크롤 가능 범위
      const maxScrollLeft = scrollContainer.current.scrollWidth - scrollContainer.current.offsetWidth;
      // 스크롤 위치가 스크롤 길이를 넘지 않도록 제한
      const scrollAmount = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
      scrollContainer.current.scrollLeft = scrollAmount;
    }
  }

  function performanceOnDragStart(e: DragEvent) {
    // 성능 측정('production' 변경)
    if (process.env.NODE_ENV === 'development') {
      // 60fps 지향, delay는 최대 16.666ms
      measureCallbackCount(e, 0, 15);
    }
    onDragStart(e);
  }

  return (
    <>
      {data && (
        <motion.div
          ref={scrollContainer}
          className={styles.cateoryList}
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          draggable={isScrollAble}
          onDragStart={performanceOnDragStart}
          onDrag={throttle(onDragMouse, 15)}
          onDragEnd={onDragMouse}
        >
          <MenuCategoryList />
        </motion.div>
      )}
    </>
  );
}
