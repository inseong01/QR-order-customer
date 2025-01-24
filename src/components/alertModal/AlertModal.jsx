'use client';

import { useBoundStore } from '@/lib/store/useBoundStore';
import OrderCheckDialog from './OrderCheckDialog';
import RequestDialog from './RequestDialog';

import { useQueryClient } from '@tanstack/react-query';

export default function AlertModal({ type }) {
  // store
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const resetCallState = useBoundStore((state) => state.resetCallState);
  const fetchOrderSubmitState = useBoundStore((state) => state.fetchOrderSubmitState);
  // useQueryClient
  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(['orderList']);

  // db 제출 거부, '아니요'
  function onClickNotEnsureSubmit() {
    setModalOpen({ isOpen: false });
  }

  // db 제출 허용, '예'
  function onClickEnsureSubmit() {
    if (isSubmit) return;
    switch (type) {
      case 'orderCheck': {
        // 주문 전달
        fetchOrderSubmitState({ pickUpList, submitError: queryState.status === 'error' });
        setModalOpen({ isOpen: false });
        break;
      }
      case 'request': {
        resetCallState(); // 초기화
        break;
      }
    }
  }

  switch (type) {
    case 'orderCheck': {
      return (
        <OrderCheckDialog onClickEnsure={onClickEnsureSubmit} onClickNotEnsure={onClickNotEnsureSubmit} />
      );
    }
    case 'request': {
      return <RequestDialog onClickEnsureSubmit={onClickEnsureSubmit} />;
    }
  }
}
