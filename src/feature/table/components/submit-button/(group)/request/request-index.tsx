import makeSentence from "@/lib/function/makeSentence";
import { useBoundStore } from "@/lib/store/useBoundStore";
import PickItem from "./request-item";

// Top
export function PickAndCountButton() {
  const selectedItemArr = useBoundStore(
    (state) => state.callState.selectedItemArr,
  );

  return (
    <div className={"h-auto w-full"}>
      <ul className={"flex w-full flex-col gap-4"}>
        {selectedItemArr.map((item, idx) => {
          return <PickItem key={idx} item={item} />;
        })}
      </ul>
    </div>
  );
}

// Bottom
export function SubmitRequest() {
  const requestList = useBoundStore((state) => state.callState.selectedItemArr);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const fetchRequestSubmitState = useBoundStore(
    (state) => state.fetchRequestSubmitState,
  );

  // 호출하기
  function onClickSubmitRequestList() {
    if (isSubmit) return;
    // 알림으로 requestList(요청) 전달
    const requestStr = makeSentence(requestList);
    fetchRequestSubmitState({ requestStr });
  }

  return (
    <button
      className={
        "flex h-full w-full cursor-pointer items-center justify-center p-4"
      }
      onClick={onClickSubmitRequestList}
    >
      요청하기
    </button>
  );
}
