'use client';

import { useBoundStore } from '@/lib/store/useBoundStore';
import { orderListQueryOption } from '@/lib/function/useQuery/queryOption';
import OrderCheckDialog from './OrderCheckDialog';
import RequestDialog from './RequestDialog';

import { useQueryClient } from '@tanstack/react-query';

export default function AlertModal() {
  // store
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const pickUpList = useBoundStore((state) => state.pickUpState.list);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const type = useBoundStore((state) => state.modalState.type);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const resetCallState = useBoundStore((state) => state.resetCallState);
  const fetchOrderSubmitState = useBoundStore((state) => state.fetchOrderSubmitState);
  // useQueryClient
  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(orderListQueryOption(tableName).queryKey);

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
        fetchOrderSubmitState({ pickUpList, submitError: queryState?.status === 'error' });
        // 모달 닫기
        setModalOpen({ isOpen: false });
        break;
      }
      case 'request': {
        // 초기화
        resetCallState();
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
