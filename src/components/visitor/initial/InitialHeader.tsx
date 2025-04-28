import styles from '@/style/visitor/initial/InitialHeader.module.css';
import LanguageButton from './languageButton/LanguageButton';
import CategoriesButton from './CategoriesButton';
import LogoImage from './LogoImage';
import HeaderMiddle from './HeaderMiddle';

import { memo } from 'react';

function InitialHeader() {
  return (
    <header
      className={
        'w-full bg-[#f4f4f4] flex flex-col justify-between relative px-6 py-4 z-99 min-h-[200px] h-1/5'
      }
    >
      <ul className={'flex justify-between items-center w-full'}>
        <LogoImage />
        <LanguageButton />
      </ul>
      <HeaderMiddle />
      <CategoriesButton />
    </header>
  );
}

export default memo(InitialHeader);
