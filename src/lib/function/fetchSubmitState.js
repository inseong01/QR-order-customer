import postOrderList from "../supabase/function/postOrderList";
import postRequestList from "../supabase/function/postRequestList";

export const fetchSubmitState = process.env.NODE_ENV === 'development' ?
  async ({ set, get, pickUpList, requestStr, submitError }) => {
    let result;
    let status = 'pending';
    let isSubmit = true;
    const submitType = pickUpList ? 'fetchOrderSubmitState' : 'fetchRequestSubmitState'
    const tableNum = get().tableState.tableNum;
    const setModalOpen = get().setModalOpen;
    // GetTableOrderList 에러 발생, 메뉴 전달 이전 반환
    if (submitError) {
      status = 'rejected';
      isSubmit = false;
      set(() => ({ submitState: { isSubmit, status } }), undefined, `submitState/${submitType}/${status}`);
      return;
    }
    // 패치 유형 분류
    if (pickUpList) {
      result = await postOrderList(tableNum, pickUpList);
    } else if (requestStr) {
      result = await postRequestList(tableNum, requestStr);
    }
    // pending
    set(() => ({ submitState: { isSubmit, status } }), undefined, `submitState/${submitType}/${status}`);
    // UX, 결과 대기 
    await new Promise(res => setTimeout(() => res(), 500));
    // fulfilled
    status = 'fulfilled';
    isSubmit = false;
    // rejected
    if (result.error) {
      status = 'rejected';
      isSubmit = false;
    }
    // 결과값에 따른 상태 변화
    set(() => ({ submitState: { isSubmit, status } }), undefined, `submitState/${submitType}/${status}`);
    // 요청 완료창 등장
    if (requestStr) {
      setModalOpen({ isOpen: true });
    }
  } :
  async ({ set, get, pickUpList, requestStr, submitError }) => {
    let result;
    let status = 'pending';
    let isSubmit = true;
    const tableNum = get().tableState.tableNum;
    const setModalOpen = get().setModalOpen;
    // GetTableOrderList 에러 발생, 메뉴 전달 전 반환
    if (submitError) {
      status = 'rejected';
      isSubmit = false;
      set(() => ({ submitState: { isSubmit, status } }));
      return;
    }
    // 패치 유형 분류
    if (pickUpList) {
      result = await postOrderList(tableNum, pickUpList);
    } else if (requestStr) {
      result = await postRequestList(tableNum, requestStr);
    }
    // pending
    set(() => ({ submitState: { isSubmit, status } }));
    // UX, 결과 대기 
    await new Promise(res => setTimeout(() => res(), 500));
    // fulfilled
    status = 'fulfilled';
    isSubmit = false;
    // rejected
    if (result.error) {
      status = 'rejected';
      isSubmit = false;
    }
    // 결과값에 따른 상태 변화
    set(() => ({ submitState: { isSubmit, status } }));
    // 요청 완료창 등장
    if (requestStr) {
      setModalOpen({ isOpen: true });
    }
  }