import styles from '@/style/submitButton/SubmitRequestBtn.module.css';
import { fetchRequestListResponse } from '@/lib/features/submitState/submitSlice';
import makeSentence from '@/lib/function/makeSentence';

import { useDispatch, useSelector } from 'react-redux';

export default function SubmitRequestBtn() {
  // useSelector
  const requestList = useSelector((state) => state.callState.selectedItemArr);
  const tableNum = useSelector((state) => state.userState.tableNum);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);

  // useDispatch
  const dispatch = useDispatch();

  // 호출하기
  function onClickSubmitRequestList() {
    if (isSubmit) return;
    // 알림으로 requestList(요청) 전달
    const requestStr = makeSentence(requestList);
    dispatch(fetchRequestListResponse({ tableNum, requestStr }));
  }

  return (
    <div className={styles.btn} onClick={onClickSubmitRequestList}>
      요청하기
    </div>
  );
}
