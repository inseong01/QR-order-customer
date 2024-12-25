import styles from '@/style/visitor/initial/languageButton/LanguageButton.module.css';
import { lineVar, listVar, ulVar } from '@/lib/motion/header/motion_languageButton';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function SubLanguages({ isClicked, languageList }) {
  return (
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
          <motion.li key={idx} className={styles.langBox} variants={listVar}>
            <div className={styles.country}>
              <Image src={img} alt={country} width={20} height={20} />
            </div>
            <div className={styles.context}>{title}</div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
