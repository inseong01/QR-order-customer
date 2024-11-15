export default function onClickPush(router, path) {
  switch (path) {
    case 'back': {
      return () => {
        router.back();
      }
    }
    default: {
      return () => {
        router.push(path);
      }
    }
  }
}