import { useBoundStore } from '@/lib/store/useBoundStore';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBellConcierge,
  faList,
  faReceipt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

type RouterCategory = 'call' | 'orderList' | 'bill';

export default function CategoriesButton() {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const requestIsClicked = useBoundStore((state) => state.requestState.isClicked);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);
  // useRouter
  const router = useRouter();

  function onClickRouterOnce(category: RouterCategory) {
    return () => {
      if (requestIsClicked) return;
      setRequestClick({ isClicked: true });
      router.push(`${tableName}/${category}`);
    };
  }

  return (
    <ul className={'w-full flex justify-between items-center text-sm max-w-[350px]'}>
      <Category
        onClickFn={onClickRouterOnce('call')}
        icon={faBellConcierge}
        text={'직원호출'}
      />
      <Category
        onClickFn={onClickRouterOnce('orderList')}
        icon={faList}
        text={'주문내역'}
      />
      <Category onClickFn={onClickRouterOnce('bill')} icon={faReceipt} text={'계산서'} />
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
    <li className={'h-5 flex items-center cursor-pointer gap-2'} onClick={onClickFn}>
      <div className={'w-[14px] h-[14px] flex '}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className={'leading-5'}>{text}</p>
    </li>
  );
}
