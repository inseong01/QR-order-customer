import styles from '@/style/visitor/initial/languageButton/LanguageButton.module.css';
import { arrowVar } from '@/lib/motion/header/motion_languageButton';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function MainLanguage({ languageList, isClicked }) {
  return (
    <>
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
    </>
  );
}
