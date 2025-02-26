import CallPageWrap from '@/components/visitor/call/CallPageWrap';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import { requestListQueryOption } from '@/lib/function/useQuery/queryOption';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function CallPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(requestListQueryOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CallPageWrap />
    </HydrationBoundary>
  );
}
