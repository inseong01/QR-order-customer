import InitialClientPage from '@/components/visitor/InitialClientPage';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import { menuListQueryOption } from '@/lib/function/useQuery/queryOption';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

function Page() {
  // useQuery prefetching
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(menuListQueryOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InitialClientPage />
    </HydrationBoundary>
  );
}

export default Page;
