import OrderListPageWrap from '@/components/visitor/order/OrderListPageWrap';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import { orderListQueryOption } from '@/lib/function/useQuery/queryOption';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function OrderListPage({ params }) {
  const paramsObj = await params;
  // useQuery prefetch
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(orderListQueryOption(paramsObj.table));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderListPageWrap />
    </HydrationBoundary>
  );
}
