import ScrollMenuCateory from "./scroll-menu-category/category-index";
import MenuDisplay from "./display-menu/menu-index";

import { memo } from "react";

function TableInitMain() {
  return (
    <main id="menuList" className={"relative h-full w-full bg-white"}>
      <ScrollMenuCateory />
      <MenuDisplay />
    </main>
  );
}

// export default memo(InitialMain);
export default memo(TableInitMain);
