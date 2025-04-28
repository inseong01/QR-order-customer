import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MainLanguage() {
  return (
    <>
      <div className={'w-4 h-4 flex'}>
        <FontAwesomeIcon icon={faGlobe} />
      </div>
      <div>KR</div>
    </>
  );
}
