import InitialClientPage from '@/components/visitor/InitialClientPage';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import { categoryListQueryOption, menuListQueryOption } from '@/lib/function/useQuery/queryOption';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

async function Page() {
  // useQuery prefetch
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(menuListQueryOption);
  await queryClient.prefetchQuery(categoryListQueryOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InitialClientPage />
    </HydrationBoundary>
  );
}

export default Page;
