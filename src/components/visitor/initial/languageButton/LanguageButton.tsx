import styles from '@/style/visitor/initial/languageButton/LanguageButton.module.css';
import MainLanguage from './MainLanguage';

export default function LanguageButton() {
  return (
    <li className={styles.langBox}>
      <MainLanguage />
    </li>
  );
}
