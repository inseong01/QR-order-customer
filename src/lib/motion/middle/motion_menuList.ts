// motion
export const ulVariants = {
  active: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  inactive: {},
};
export const liVariants = {
  active: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  inactive: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};