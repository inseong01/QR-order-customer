import BillPageWrap from '@/components/visitor/bill/BillPageWrap';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import { orderListQueryOption } from '@/lib/function/useQuery/queryOption';
import { Params } from '@/types/common';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function BillPage({ params }: { params: Params }) {
  const paramsObj = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(orderListQueryOption(paramsObj.table));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BillPageWrap />
    </HydrationBoundary>
  );
}
