import { throttle } from "../optimize/throttle";
/**
 * 애니메이션 함수 실행 간격 측정
 *
 * 측정 방법
 * - 배포 환경에서 개별 'test_type' 변경하여 측정
 *
 * @param e Event
 * @param test_type 테스트 유형
 * @param container 스크롤박스 Ref
 */
export function measureCallbackElapsed(
  e: DragEvent,
  test_type: "throttle" | "requestAnimationFrame",
  container: HTMLDivElement | null,
) {
  if (!container) return;

  const maxScrollLeft = container.scrollWidth - container.offsetWidth;

  // 함수 실행 간격 확인
  const arr: number[] = [];
  let startTime = performance.now();

  function sum(prev: number, current: number) {
    return prev + current;
  }

  switch (test_type) {
    case "throttle": {
      let interval: NodeJS.Timeout | number;

      const animationCallback = () => {
        const isScrollLefEndPoint = container.scrollLeft >= maxScrollLeft;
        if (isScrollLefEndPoint) {
          clearInterval(interval);

          // 분산 계산
          const mean = arr.reduce(sum, 0) / arr.length;
          const variance = arr.reduce(calculateVarianceStep, 0) / arr.length;

          function calculateVarianceStep(sum: number, curt: number) {
            return sum + (curt - mean) ** 2;
          }

          // 표준편차 계산
          const standardDevation = Math.sqrt(variance);

          // 출력
          console.log("[ Throttle ]");
          console.log("mean: ", mean);
          console.log("variance: ", variance);
          console.log("standardDevation: ", standardDevation);

          return;
        }

        container.scrollLeft += 1;
      };

      interval = setInterval(throttle(trackFrameElapsedTime, 6), 1);

      function trackFrameElapsedTime() {
        const now = performance.now();
        const elapsed = now - startTime;

        // 간격 값 모음
        arr.push(Number(elapsed.toFixed(2)));

        // 애니메이션 진행
        animationCallback();

        startTime = now;
      }

      break;
    }
    case "requestAnimationFrame": {
      let animationCallbackID = 0;

      const animationCallback = () => {
        const now = performance.now();
        const elapsed = now - startTime;

        // 간격 값 모음
        arr.push(Number(elapsed.toFixed(2)));

        if (container.scrollLeft >= maxScrollLeft) {
          cancelAnimationFrame(animationCallbackID);

          // 분산 계산
          const mean = arr.reduce(sum, 0) / arr.length;
          const variance = arr.reduce(calculateVarianceStep, 0) / arr.length;

          function calculateVarianceStep(sum: number, curt: number) {
            return sum + (curt - mean) ** 2;
          }

          // 표준편차 계산
          const standardDevation = Math.sqrt(variance);

          // 출력
          console.log("[ RequestAnimationFrame ]");
          console.log("mean: ", mean);
          console.log("variance: ", variance);
          console.log("standardDevation: ", standardDevation);
          return;
        }

        container.scrollLeft += 1;

        // 애니메이션 ID 등록
        animationCallbackID = requestAnimationFrame(animationCallback);

        startTime = now;
      };

      requestAnimationFrame(animationCallback);
      break;
    }
    default: {
      console.error("Invaliable case");
    }
  }
}
