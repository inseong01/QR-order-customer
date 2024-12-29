export const debounce = (callback, delay) => {
  let setTimeId;
  return () => {
    clearTimeout(setTimeId);
    setTimeId = setTimeout(() => {
      callback();
    }, delay);
  };
}