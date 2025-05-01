type Domain = "call" | "bill" | "order" | "history";

export default function ExceptionMessage({
  domain,
  isServerError,
}: {
  domain: Domain;
  isServerError?: boolean;
}) {
  let description;

  switch (domain) {
    case "bill":
    case "history": {
      description = isServerError
        ? "목록을 불러오는 데 오류가 발생했습니다. 카운터에서 확인해 주세요."
        : "주문 내역이 없습니다.";
      break;
    }
    case "call": {
      description = "카운터에서 요청해 주세요.";
    }
  }

  return (
    <div>
      <p className={"text-xs text-[#959595]"}>{description}</p>
    </div>
  );
}
