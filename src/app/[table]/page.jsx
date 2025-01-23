import InitialClientPage from '@/components/visitor/initial/InitialClientPage';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import { categoryListQueryOption, menuListQueryOption } from '@/lib/function/useQuery/queryOption';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

async function Page() {
  // useQuery prefetch
  const queryClient = getQueryClient();

  // parallel process
  await Promise.all(
    [queryClient.prefetchQuery(menuListQueryOption)],
    [queryClient.prefetchQuery(categoryListQueryOption)]
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InitialClientPage />
    </HydrationBoundary>
  );
}

export default Page;
