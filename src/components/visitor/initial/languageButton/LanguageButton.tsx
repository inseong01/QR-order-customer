import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import MainLanguage from './MainLanguage';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function LanguageButton() {
  return (
    <li className={'flex items-center gap-2 cursor-pointer relative'}>
      {/* <MainLanguage /> */}
      <div className={'w-4 h-4 flex'}>
        <FontAwesomeIcon icon={faGlobe} />
      </div>
      <div>KR</div>
    </li>
  );
}
