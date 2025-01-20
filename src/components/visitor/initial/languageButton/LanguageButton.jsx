import styles from '@/style/visitor/initial/languageButton/LanguageButton.module.css';
import MainLanguage from './MainLanguage';

import { useState } from 'react';

export default function LanguageButton() {
  const [isClicked, setIsClicked] = useState(false);

  function onClickLanguageBtn() {
    setIsClicked((prev) => !prev);
  }

  return (
    <li className={styles.langBox} onClick={onClickLanguageBtn}>
      <MainLanguage isClicked={isClicked} />
    </li>
  );
}
