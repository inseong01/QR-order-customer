export const debounce = (callback: () => void, delay: number) => {
  let setTimeId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(setTimeId);

    setTimeId = setTimeout(() => {
      callback();
    }, delay);
  };
};
