import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import LogoImage from "feature/components/logo/logo-index";
import RowSpaceBetween from "../(router)/components/horizontal-stack/stack-between/between-index";

export default function HeaderTop() {
  return (
    <RowSpaceBetween tag="div">
      <LogoImage />
      <LanguageButton />
    </RowSpaceBetween>
  );
}

function LanguageButton() {
  return (
    <div className={"relative flex cursor-pointer items-center gap-2"}>
      <div className={"flex h-4 w-4"}>
        <FontAwesomeIcon icon={faGlobe} />
      </div>
      <div>KR</div>
    </div>
  );
}
