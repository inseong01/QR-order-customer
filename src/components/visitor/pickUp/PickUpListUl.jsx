import styles from '@/style/visitor/pickUpList/PickUpListUl.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import PickUpList from './PickUpList';

function EmptyListComponent() {
  return <li>주문 목록이 없습니다.</li>;
}

export default function PickUpListUl() {
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);
  const removePickUpMenu = useBoundStore((state) => state.removePickUpMenu);

  function onClickDeletePickUpList(id) {
    return () => {
      removePickUpMenu({ id });
    };
  }

  return (
    <ul className={`${styles.pickUpLists}`}>
      {currentOrderList.length !== 0 ? (
        <PickUpList currentOrderList={currentOrderList} deleteList={onClickDeletePickUpList} />
      ) : (
        <EmptyListComponent />
      )}
    </ul>
  );
}
