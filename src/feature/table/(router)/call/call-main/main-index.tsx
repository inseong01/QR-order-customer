import { requestListQueryOption } from "@/lib/function/useQuery/query-option";
import RequestList from "./display-request/request-index";
import MainTagFrame from "../../components/frame/main/main-index";
import ExceptionMessage from "../../components/exception/show-message/message-index";
import VerticalStackGroup from "../../components/vertical-stack/stack-index";
import Divider from "../../components/line/line-index";

import { useQueryClient } from "@tanstack/react-query";

export default function CallPageMain() {
  // useQueryClient
  const queryClient = useQueryClient();
  const request = queryClient.getQueryState(requestListQueryOption.queryKey);
  // variant
  const isNotError = !!request && request.status !== "error";

  return (
    <MainTagFrame>
      <PageTitle isNotError={isNotError} />
      {isNotError ? (
        <RequestList data={request?.data ?? []} />
      ) : (
        <ExceptionMessage domain="call" />
      )}
    </MainTagFrame>
  );
}

function PageTitle({ isNotError }: { isNotError: boolean }) {
  const title = isNotError ? "요청 항목을 선택해주세요" : "요청 목록 오류";

  return (
    <VerticalStackGroup tag="div" gap="gap-2.5">
      <p>{title}</p>
      <Divider />
    </VerticalStackGroup>
  );
}
