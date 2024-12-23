'use client';

import styles from '@/style/visitor/LanguageButton.module.css';
import { arrowVar, lineVar, listVar, ulVar } from '@/lib/motion/header/motion_languageButton';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';

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

  return (
    <li
      className={styles.langBox}
      onClick={() => {
        setIsClicked((prev) => !prev);
      }}
    >
      <div className={styles.country}>
        <Image src={languageList[0].img} alt={languageList[0].country} width={20} height={20} />
      </div>
      <div className={styles.context}>{languageList[0].title}</div>
      <motion.div
        className={`${styles.nav} `}
        variants={arrowVar}
        animate={isClicked ? 'active' : 'inactive'}
      >
        <Image src={'/img/down-arrow.webp'} alt="아랫 방향 화살표" width={10} height={10} />
      </motion.div>
      <motion.ul
        className={styles.otherLang}
        variants={ulVar}
        initial={'inactive'}
        animate={isClicked ? 'active' : 'inactive'}
      >
        <motion.li className={styles.line} variants={lineVar}></motion.li>
        {languageList.slice(1).map((list, idx) => {
          const { title, img, country } = list;
          return (
            <motion.li
              key={idx}
              className={styles.langBox}
              onClick={(e) => {
                e.stopPropagation();
                console.log('click');
              }}
              variants={listVar}
            >
              <div className={styles.country}>
                <Image src={img} alt={country} width={20} height={20} />
              </div>
              <div className={styles.context}>{title}</div>
            </motion.li>
          );
        })}
      </motion.ul>
    </li>
  );
}
