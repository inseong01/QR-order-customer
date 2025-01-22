import styles from '@/style/visitor/initial/languageButton/LanguageButton.module.css';

import Image from 'next/image';

export default function MainLanguage() {
  return (
    <>
      <Image src={'/img/internet.webp'} width={13} height={13} alt="language" />
      <div className={styles.context}>KR</div>
    </>
  );
}
