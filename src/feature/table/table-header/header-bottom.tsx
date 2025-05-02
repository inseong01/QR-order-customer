import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBellConcierge,
  faList,
  faReceipt,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

import { useBoundStore } from "@/lib/store/use-bound-store";

type RouterCategory = "call" | "history" | "bill";

export default function HeaderBottom() {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const requestIsClicked = useBoundStore((state) => state.flagState.isClicked);
  const setFlag = useBoundStore((state) => state.setFlag);
  // useRouter
  const router = useRouter();

  function onClickRouterOnce(category: RouterCategory) {
    return () => {
      if (requestIsClicked) return;
      setFlag({ isClicked: true });
      router.push(`${tableName}/${category}`);
    };
  }

  return (
    <ul
      className={
        "flex w-full max-w-[350px] items-center justify-between text-sm"
      }
    >
      <Category
        onClickFn={onClickRouterOnce("call")}
        icon={faBellConcierge}
        text={"직원호출"}
      />
      <Category
        onClickFn={onClickRouterOnce("history")}
        icon={faList}
        text={"주문내역"}
      />
      <Category
        onClickFn={onClickRouterOnce("bill")}
        icon={faReceipt}
        text={"계산서"}
      />
    </ul>
  );
}

function Category({
  onClickFn,
  icon,
  text,
}: {
  onClickFn: () => void;
  icon: IconDefinition;
  text: string;
}) {
  return (
    <li
      className={"flex h-5 cursor-pointer items-center gap-2"}
      onClick={onClickFn}
    >
      <div className={"flex h-[14px] w-[14px]"}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className={"leading-5"}>{text}</p>
    </li>
  );
}
