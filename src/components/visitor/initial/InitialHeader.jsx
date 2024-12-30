import styles from '@/style/visitor/initial/InitialHeader.module.css';
import LanguageButton from './languageButton/LanguageButton';
import CategoriesButton from './CategoriesButton';
import LogoImage from './LogoImage';
import HeaderMiddle from './HeaderMiddle';

import { memo } from 'react';

function InitialHeader() {
  return (
    <header className={styles.header}>
      <ul className={styles.top}>
        <LogoImage />
        <LanguageButton />
      </ul>
      <HeaderMiddle />
      <CategoriesButton />
    </header>
  );
}

export default memo(InitialHeader);
