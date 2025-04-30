import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import LogoImage from "feature/components/logo/logo-index";

export default function HeaderTop() {
  return (
    <ul className={"flex w-full items-center justify-between"}>
      <LogoImage />
      <LanguageButton />
    </ul>
  );
}

function LanguageButton() {
  return (
    <li className={"relative flex cursor-pointer items-center gap-2"}>
      <div className={"flex h-4 w-4"}>
        <FontAwesomeIcon icon={faGlobe} />
      </div>
      <div>KR</div>
    </li>
  );
}
