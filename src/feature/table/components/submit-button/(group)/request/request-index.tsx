import makeSentence from "@/lib/function/submit-button/make-sentence";
import { useBoundStore } from "@/lib/store/use-bound-store";
import PickItem from "./request-item";

// Top
export function PickAndCountButton() {
  const selectedArr = useBoundStore(
    (state) => state.callState.selectedRequests,
  );

  return (
    <div className={"h-auto w-full"}>
      <ul className={"flex w-full flex-col gap-4"}>
        {selectedArr.map((item, idx) => {
          return <PickItem key={idx} item={item} />;
        })}
      </ul>
    </div>
  );
}

// Bottom
export function SubmitRequest() {
  const requestArr = useBoundStore((state) => state.callState.selectedRequests);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const fetchRequest = useBoundStore((state) => state.fetchRequest);

  // 호출하기
  function onClickSubmitRequestList() {
    if (isSubmit) return;
    // 알림으로 requestList(요청) 전달
    const requestStr = makeSentence(requestArr);
    fetchRequest({ requestStr });
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
