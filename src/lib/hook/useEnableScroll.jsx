import { debounce } from '../function/debounce';

import { useEffect, useRef, useState } from 'react';

export default function useEnableScroll(scrollContainer) {
  // useState
  const [isScrollAble, setScrollAble] = useState(false);
  // useRef
  const debouncedCallbackRef = useRef(null);

  // 화면 너비 감지
  useEffect(() => {
    if (!scrollContainer.current) return;
    function checkScroll() {
      if (scrollContainer.current.scrollWidth > scrollContainer.current.offsetWidth) {
        setScrollAble(true);
      }
    }
    function detectWindowWidth() {
      setScrollAble(scrollContainer.current.scrollWidth > scrollContainer.current.offsetWidth);
    }
    debouncedCallbackRef.current = debounce(detectWindowWidth, 250);

    // 초기 로드, 스크로 여부 결정
    checkScroll();
    // resize 이벤트 최적화
    window.addEventListener('resize', debouncedCallbackRef.current);

    return () => {
      window.removeEventListener('resize', debouncedCallbackRef.current);
    };
  }, [scrollContainer]);

  return { isScrollAble };
}
