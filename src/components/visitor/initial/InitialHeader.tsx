import LanguageButton from "./languageButton/LanguageButton";
import CategoriesButton from "./CategoriesButton";
import LogoImage from "./LogoImage";
import HeaderMiddle from "./HeaderMiddle";

import { memo } from "react";

function InitialHeader() {
  return (
    <header
      className={
        "relative z-99 flex h-1/5 max-h-50 min-h-[200px] w-full flex-col justify-between bg-[#f4f4f4] px-6 py-4"
      }
    >
      <ul className={"flex w-full items-center justify-between"}>
        <LogoImage />
        <LanguageButton />
      </ul>
      <HeaderMiddle />
      <CategoriesButton />
    </header>
  );
}

export default memo(InitialHeader);
