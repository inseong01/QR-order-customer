import HistoryPage from "feature/table/(router)/history/history-index";
import { getQueryClient } from "@/lib/function/useQuery/getQueryClient";
import { orderListQueryOption } from "@/lib/function/useQuery/queryOption";
import { Params } from "@/types/common";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { table } = await params;

  return {
    title: `주문내역`,
    description: `${table}번 테이블 주문내역 페이지입니다.`,
    metadataBase: new URL(
      `https://qr-order-client.vercel.app/${table}/history`,
    ),
  };
}

export default async function Page({ params }: { params: Params }) {
  const paramsObj = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(orderListQueryOption(paramsObj.table));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HistoryPage />
    </HydrationBoundary>
  );
}
