import styles from '@/style/visitor/initial/languageButton/LanguageButton.module.css';

import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MainLanguage() {
  return (
    <>
      <div>
        <FontAwesomeIcon icon={faGlobe} />
      </div>
      <div className={styles.context}>KR</div>
    </>
  );
}
