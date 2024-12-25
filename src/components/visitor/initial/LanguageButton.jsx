import styles from '@/style/visitor/initial/languageButton/LanguageButton.module.css';
import MainLanguage from './languageButton/MainLanguage';
import SubLanguages from './languageButton/SubLanguages';

import { useState } from 'react';

const languageList = [
  {
    title: '한국어',
    img: '/img/korea-flag.webp',
    country: 'korea',
  },
  {
    title: 'English',
    img: '/img/us-flag.webp',
    country: 'america',
  },
];

function LanguageButton() {
  // useStatee
  const [isClicked, setIsClicked] = useState(false);

  return (
    <li
      className={styles.langBox}
      onClick={() => {
        setIsClicked((prev) => !prev);
      }}
    >
      <MainLanguage languageList={languageList} isClicked={isClicked} />
      <SubLanguages languageList={languageList} isClicked={isClicked} />
    </li>
  );
}

export default LanguageButton;
