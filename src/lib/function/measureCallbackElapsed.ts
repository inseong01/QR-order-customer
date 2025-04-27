import { throttle } from './throttle';
/**
 * 콜백 함수 실행 간격 측정
 *
 * @param e Event
 * @param test_type 테스트 유형
 * @param scrollContainer 스크롤박스 Ref
 */
export function measureCallbackElapsed(
  e: DragEvent,
  test_type: 'throttle' | 'requestAnimationFrame',
  scrollContainer: HTMLDivElement | null
) {
  if (!scrollContainer) return;
  const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.offsetWidth;

  // 함수 실행 간격 확인
  const arr: number[] = [];
  let startTime = performance.now();

  // 계산 함수
  const sum = (prev: number, current: number) => prev + current;

  switch (test_type) {
    case 'throttle': {
      let interval: NodeJS.Timeout | number;

      const animationCallback = () => {
        if (scrollContainer.scrollLeft >= maxScrollLeft) {
          clearInterval(interval);
          // 표준 계산
          const mean = arr.reduce(sum, 0) / arr.length;
          // 분산 계산
          const variance =
            arr.reduce((sum, curt) => sum + (curt - mean) ** 2, 0) / arr.length;
          // 표준편차 계산
          const standardDevation = Math.sqrt(variance);
          console.log('Throttle: ', mean, variance, standardDevation);
          return;
        }
        scrollContainer.scrollLeft += 1;
      };

      interval = setInterval(
        throttle(() => {
          const now = performance.now();
          const elapsed = now - startTime;
          arr.push(Number(elapsed.toFixed(2)));
          animationCallback();
          startTime = now;
        }, 6),
        1
      );

      break;
    }
    case 'requestAnimationFrame': {
      let animationCallbackID = 0;

      const animationCallback = () => {
        const now = performance.now();
        const elapsed = now - startTime;
        arr.push(Number(elapsed.toFixed(2)));

        if (scrollContainer.scrollLeft >= maxScrollLeft) {
          cancelAnimationFrame(animationCallbackID);
          // 표준 계산
          const mean = arr.reduce(sum, 0) / arr.length;
          // 분산 계산
          const variance =
            arr.reduce((sum, curt) => sum + (curt - mean) ** 2, 0) / arr.length;
          // 표준편차 계산
          const standardDevation = Math.sqrt(variance);
          console.log('RequestAnimationFrame: ', mean, variance, standardDevation);
          return;
        }
        scrollContainer.scrollLeft += 1;
        animationCallbackID = requestAnimationFrame(animationCallback);
        startTime = now;
      };

      requestAnimationFrame(animationCallback);
      break;
    }
    default: {
      console.error('Invaliable case');
    }
  }
}
