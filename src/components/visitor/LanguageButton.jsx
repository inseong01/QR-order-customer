'use client';

import styles from '@/style/visitor/LanguageButton.module.css';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';

const languageList = [
  {
    title: '한국어',
    img: '/img/korea-flag.png',
    country: 'korea',
  },
  {
    title: 'English',
    img: '/img/us-flag.png',
    country: 'america',
  },
];

export default function LanguageButton() {
  // useStatee
  const [isClicked, setIsClicked] = useState(false);
  // motion
  const arrowVar = {
    active: {
      rotateZ: -180,
    },
    inactive: {
      rotateZ: 0,
    },
  };
  // ul
  const ulVar = {
    active: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
        staggerChildren: 0.2,
      },
    },
    inactive: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  // line
  const lineVar = {
    active: {
      transition: {
        duration: 0.3,
      },
      opacity: 1,
    },
    inactive: {
      transition: {
        duration: 0.3,
      },
      opacity: 0,
    },
  };
  // list
  const listVar = {
    active: {
      transition: {
        duration: 0.3,
        y: { duration: 0 },
      },
      y: 0,
      opacity: 1,
    },
    inactive: {
      transition: {
        duration: 0.3,
      },
      y: 5,
      opacity: 0,
    },
  };

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
        <Image src={'/img/down-arrow.png'} alt="아랫 방향 화살표" width={10} height={10} />
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
