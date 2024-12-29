export function throttle(callback, delay) {
  let lastCall = 0;
  return (e) => {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(e);
    }
  };
}