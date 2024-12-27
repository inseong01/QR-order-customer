import styles from '@/style/visitor/initial/MenuCateoryTitleList.module.css';
import { categoryListQueryOption } from '@/lib/function/useQuery/queryOption';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import MenuCategoryList from './MenuCategoryList';

export default function MenuCateoryTitleList() {
  const [scrollStart, geScrollX] = useState();
  const [isScrollAble, setScrollAble] = useState();
  // useRef
  const scrollContainer = useRef(null);
  // // useSuspenseQuery
  const { data } = useSuspenseQuery(categoryListQueryOption);

  useEffect(() => {
    if (!scrollContainer.current) return;

    function setScroll() {
      setScrollAble(scrollContainer.current.scrollWidth > scrollContainer.current.offsetWidth);
    }
    window.addEventListener('resize', setScroll);

    return () => {
      window.removeEventListener('resize', setScroll);
    };
  }, [scrollContainer]);

  return (
    <>
      {data && (
        <motion.div
          ref={scrollContainer}
          className={`${styles.cateoryList}`}
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          draggable={isScrollAble}
          onDragStart={(e) => {
            geScrollX({ x: e.clientX, scrollX: scrollContainer.current.scrollLeft });
            // 사진 잔상 없애기
            const img = new Image();
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
            e.dataTransfer.setDragImage(img, 0, 0);
          }}
          onDrag={(e) => {
            // 연산 최소화, 최적화 필요, throttle/debounce 권함 (움직이고 가만히 있을 때 반환)
            const lastX = e.clientX;
            const move = lastX - scrollStart.x;
            // 현재 스크롤 위치를 계산
            const newScrollLeft = scrollStart.scrollX - move;
            // 스크롤 위치가 음수 또는 최대 스크롤 길이를 넘지 않도록 제한
            const scrollAmount = Math.max(0, Math.min(newScrollLeft, scrollContainer.current.scrollWidth));
            scrollContainer.current.scrollLeft = scrollAmount;
            console.log('1');
          }}
          onDragEnd={(e) => {
            {
              const lastX = e.clientX;
              const move = lastX - scrollStart.x;
              // 현재 스크롤 위치를 계산
              const newScrollLeft = scrollStart.scrollX - move;
              // 스크롤 위치가 음수 또는 최대 스크롤 길이를 넘지 않도록 제한
              const scrollAmount = Math.max(0, Math.min(newScrollLeft, scrollContainer.current.scrollWidth));
              scrollContainer.current.scrollLeft = scrollAmount;
              console.log('2');
            }
          }}
        >
          <MenuCategoryList />
        </motion.div>
      )}
    </>
  );
}
