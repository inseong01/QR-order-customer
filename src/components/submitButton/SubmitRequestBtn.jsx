import styles from '@/style/submitButton/SubmitRequestBtn.module.css';
import { useBoundStore } from '@/lib/store/useBoundStore';
import makeSentence from '@/lib/function/makeSentence';

export default function SubmitRequestBtn() {
  const tableNum = useBoundStore((state) => state.tableState.tableNum);
  const requestList = useBoundStore((state) => state.callState.selectedItemArr);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const fetchRequestSubmitState = useBoundStore((state) => state.fetchRequestSubmitState);

  // 호출하기
  function onClickSubmitRequestList() {
    if (isSubmit) return;
    // 알림으로 requestList(요청) 전달
    const requestStr = makeSentence(requestList);
    fetchRequestSubmitState({ tableNum, requestStr });
  }

  return (
    <div className={styles.btn} onClick={onClickSubmitRequestList}>
      요청하기
    </div>
  );
}
