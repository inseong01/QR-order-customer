import styles from '@/style/visitor/initial/languageButton/LanguageButton.module.css';
import MainLanguage from './languageButton/MainLanguage';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicSubLanguages = dynamic(() => import('./languageButton/SubLanguages'));

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

export default function LanguageButton() {
  // useStatee
  const [isClicked, setIsClicked] = useState(false);
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    if (isClicked) {
      setMount(true);
    }
  }, [isClicked]);

  function onClickLanguageBtn() {
    setIsClicked((prev) => !prev);
  }

  return (
    <li className={styles.langBox} onClick={onClickLanguageBtn}>
      <MainLanguage languageList={languageList} isClicked={isClicked} />
      {isMounted && <DynamicSubLanguages languageList={languageList} isClicked={isClicked} />}
    </li>
  );
}
