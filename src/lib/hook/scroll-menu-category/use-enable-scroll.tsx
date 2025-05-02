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

    // 스크롤 조건적 허용, 이벤트 발생 제한
    function checkScroll() {
      if (!scrollContainer.current) return;
      if (
        scrollContainer.current.scrollWidth >
        scrollContainer.current.offsetWidth
      ) {
        setScrollAble(true);
      }
    }

    function detectWindowWidth() {
      if (!scrollContainer.current) return;
      setScrollAble(
        scrollContainer.current.scrollWidth >
          scrollContainer.current.offsetWidth,
      );
    }

    // decounce 할당당
    debouncedCallbackRef.current = debounce(detectWindowWidth, 250);

    // 초기 로드, 스크로 여부 결정
    checkScroll();

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
