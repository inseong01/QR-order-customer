'use client';

import { useBoundStore } from '@/lib/store/useBoundStore';
import CountButton from '../CountButton';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function Popup() {
  // store
  const isRequestClicked = useBoundStore((state) => state.requestState.isClicked);

  const pickUpIsClicked = useBoundStore((state) => state.pickUpState.isClicked);
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const setRequestClick = useBoundStore((state) => state.setRequestClick);
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const pickUpSelectedMenu = useBoundStore((state) => state.pickUpSelectedMenu);
  // variant
  const shoppingcartEnable = !!pickUpList.length;
  const popUpType = pickUpIsClicked || !shoppingcartEnable ? 'pick' : 'order';
  // useRouter
  const router = useRouter();

  // 항목 선택
  function onClickBottom() {
    pickUpSelectedMenu();
  }

  // 주문표 확인하기
  function onClickCheckPickUpList() {
    if (isRequestClicked) return;
    setRequestClick({ isClicked: true });
    router.push(`${tableName}/pickUpList`);
  }

  switch (popUpType) {
    case 'pick': {
      return (
        <PopupBox>
          <MenuCountComp />
          <PopupButton title='음식 담기' onClick={onClickBottom} />
        </PopupBox>
      );
    }
    case 'order': {
      return (
        <PopupBox>
          <PopupButton title={'주문표 확인하기'} onClick={onClickCheckPickUpList} />
        </PopupBox>
      );
    }
  }
}

function MenuCountComp() {
  const selectedMenu = useBoundStore((state) => state.pickUpState.selectedMenu);
  const selectedMenuID = useBoundStore((state) => state.pickUpState.selectedMenu.id);
  const selectedMenuAmount = useBoundStore(
    (state) => state.pickUpState.selectedMenu.amount
  );
  return (
    <div
      className={
        'w-full flex justify-between items-center bg-white p-4 h-1/2 border-t-[1px] border-[#e6e6e6]'
      }
    >
      <div>
        <span className={'text-sm'}>{selectedMenu.name}</span>
      </div>
      <CountButton type={'pick'} amount={selectedMenuAmount} id={selectedMenuID} />
    </div>
  );
}

function PopupButton({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button
      className={
        'w-full h-1/2 flex justify-center items-center text-white bg-[#4caff8] p-4 cursor-pointer font-semibold'
      }
      onClick={onClick}
    >
      <span>{title}</span>
    </button>
  );
}

function PopupBox({ children }: { children: ReactNode }) {
  return (
    <motion.nav
      className={'w-full h-auto fixed left-0 bottom-0 flex flex-col justify-end z-9'}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ ease: 'easeOut' }}
    >
      {children}
    </motion.nav>
  );
}
