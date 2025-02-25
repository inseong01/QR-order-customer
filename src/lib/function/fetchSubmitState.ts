import { SelectedMenu, Status } from '@/types/common';
import postOrderList from '../supabase/function/postOrderList';
import postRequestList from '../supabase/function/postRequestList';
import { AllSlices, useBoundStore } from '../store/useBoundStore';
import { SubmitSlice } from '../store/submitSlice';

export const fetchSubmitState =
  process.env.NODE_ENV === 'development'
    ? async ({
        pickUpList,
        requestStr,
        submitError,
        set,
        get,
      }: {
        pickUpList?: SelectedMenu;
        requestStr?: string;
        submitError?: boolean;
        set: typeof useBoundStore.setState;
        get: () => AllSlices;
      }) => {
        let result;
        let status: Status = 'pending';
        let isSubmit = true;
        const submitType = pickUpList ? 'fetchOrderSubmitState' : 'fetchRequestSubmitState';
        const tableNum = get().tableState.tableNum;
        const setModalOpen = get().setModalOpen;
        // GetTableOrderList 에러 발생, 메뉴 전달 이전 반환
        if (submitError) {
          status = 'rejected';
          isSubmit = false;
          set(
            (state) => ({ submitState: { ...state.submitState, isSubmit, status } }),
            undefined,
            `submitState/${submitType}/${status}`
          );
          return;
        }
        // 패치 유형 분류
        if (pickUpList) {
          result = await postOrderList(tableNum, pickUpList);
        } else if (requestStr) {
          result = await postRequestList(tableNum, requestStr);
        }
        // pending
        set(
          (state) => ({ submitState: { ...state.submitState, isSubmit, status } }),
          undefined,
          `submitState/${submitType}/${status}`
        );
        // fulfilled
        status = 'fulfilled';
        isSubmit = false;
        // rejected
        if (result?.error) {
          status = 'rejected';
          isSubmit = false;
        }
        // 결과값에 따른 상태 변화
        set(
          (state) => ({ submitState: { ...state.submitState, isSubmit, status } }),
          undefined,
          `submitState/${submitType}/${status}`
        );
        // 요청 완료창 등장
        if (requestStr) {
          setModalOpen({ isOpen: true });
        }
      }
    : async ({
        pickUpList,
        requestStr,
        submitError,
        set,
        get,
      }: {
        pickUpList?: SelectedMenu;
        requestStr?: string;
        submitError?: boolean;
        set: typeof useBoundStore.setState;
        get: () => AllSlices;
      }) => {
        let result;
        let status: Status = 'pending';
        let isSubmit = true;
        const tableNum = get().tableState.tableNum;
        const setModalOpen = get().setModalOpen;
        // GetTableOrderList 에러 발생, 메뉴 전달 전 반환
        if (submitError) {
          status = 'rejected';
          isSubmit = false;
          set((state) => ({ submitState: { ...state.submitState, isSubmit, status } }));
          return;
        }
        // 패치 유형 분류
        if (pickUpList) {
          result = await postOrderList(tableNum, pickUpList);
        } else if (requestStr) {
          result = await postRequestList(tableNum, requestStr);
        }
        // pending
        set((state) => ({ submitState: { ...state.submitState, isSubmit, status } }));
        // fulfilled
        status = 'fulfilled';
        isSubmit = false;
        // rejected
        if (result?.error) {
          status = 'rejected';
          isSubmit = false;
        }
        // 결과값에 따른 상태 변화
        set((state) => ({ submitState: { ...state.submitState, isSubmit, status } }));
        // 요청 완료창 등장
        if (requestStr) {
          setModalOpen({ isOpen: true });
        }
      };
