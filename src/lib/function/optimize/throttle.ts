export function throttle(callback: (e: DragEvent) => void, delay: number) {
  let lastCall = 0;

  return (e: DragEvent) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;

      callback(e);
    }
  };
}
