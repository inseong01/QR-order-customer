import { debounce } from "../../function/optimize/debounce";

import { RefObject, useEffect, useRef, useState } from "react";

export default function useEnableScroll(
  scrollContainer: RefObject<HTMLDivElement | null>,
) {
  // useState
  const [isScrollAble, setScrollAble] = useState(false);
  // useRef
  const debouncedCallbackRef = useRef<EventListener>(null);

  // 화면 너비 감지
  useEffect(() => {
    if (!scrollContainer.current) return;

    const hasHorizontalOverflow =
      scrollContainer.current.scrollWidth > scrollContainer.current.offsetWidth;

    // 스크롤 조건적 허용, 이벤트 발생 제한
    function checkScrollCondition() {
      if (hasHorizontalOverflow) setScrollAble(true);
    }

    function detectWindowWidth() {
      setScrollAble(hasHorizontalOverflow);
    }

    debouncedCallbackRef.current = debounce(detectWindowWidth, 250);

    checkScrollCondition();

    // resize 이벤트 최적화
    window.addEventListener("resize", debouncedCallbackRef.current);

    return () => {
      if (debouncedCallbackRef.current) {
        window.removeEventListener("resize", debouncedCallbackRef.current);
      }
    };
  }, [scrollContainer]);

  return { isScrollAble };
}
