import InitialClientPage from '@/components/visitor/initial/InitialClientPage';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import { categoryListQueryOption, menuListQueryOption } from '@/lib/function/useQuery/queryOption';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

async function Page() {
  // useQuery prefetch
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(menuListQueryOption);
  await queryClient.prefetchQuery(categoryListQueryOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InitialClientPage />
      <ReactQueryDevtools initialIsOpen={false} />
    </HydrationBoundary>
  );
}

export default Page;
