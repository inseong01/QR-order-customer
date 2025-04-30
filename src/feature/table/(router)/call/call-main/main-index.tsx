import { requestListQueryOption } from "@/lib/function/useQuery/queryOption";
import RequestList from "./display-request/request-index";

import { useQueryClient } from "@tanstack/react-query";

export default function CallPageMain() {
  // useQueryClient
  const queryClient = useQueryClient();
  const request = queryClient.getQueryState(requestListQueryOption.queryKey);
  // variant
  const isNotError = !!request && request.status !== "error";

  return (
    <main
      className={
        "flex h-[calc(100vh-45px)] w-full flex-col gap-5 overflow-y-auto p-4"
      }
    >
      <PageTitle isNotError={isNotError} />
      {isNotError ? (
        <RequestList data={request.data} />
      ) : (
        <ErrorMessageComponent />
      )}
    </main>
  );
}

function ErrorMessageComponent() {
  return <p className={"text-[959595 text-xs"}>카운터에서 요청해 주세요.</p>;
}

function PageTitle({ isNotError }: { isNotError: boolean }) {
  const title = isNotError ? "요청 항목을 선택해주세요" : "요청 목록 오류";

  return (
    <div className={"flex w-full flex-col gap-2.5"}>
      <p>{title}</p>
      <div className={"h-px w-full bg-[#c9c9c9]"}></div>
    </div>
  );
}
