// ul
export const ulVar = {
  active: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
      staggerChildren: 0.2,
    },
  },
  inactive: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.2,
    },
  },
};
// line
export const lineVar = {
  active: {
    transition: {
      duration: 0.3,
    },
    opacity: 1,
  },
  inactive: {
    transition: {
      duration: 0.3,
    },
    opacity: 0,
  },
};
// list
export const listVar = {
  active: {
    transition: {
      duration: 0.3,
      y: { duration: 0 },
    },
    y: 0,
    opacity: 1,
  },
  inactive: {
    transition: {
      duration: 0.3,
    },
    y: 5,
    opacity: 0,
  },
};
