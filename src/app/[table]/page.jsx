import InitialClientPage from '@/components/visitor/initial/InitialClientPage';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import { categoryListQueryOption, menuListQueryOption } from '@/lib/function/useQuery/queryOption';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

async function Page() {
  // useQuery prefetch
  const queryClient = getQueryClient();

  // parallel process
  await Promise.all([
    queryClient.prefetchQuery(menuListQueryOption),
    queryClient.prefetchQuery(categoryListQueryOption),
  ]);

  return (
    <HydrationBoundary
      state={dehydrate(queryClient, {
        // dehydrate 에러 처리
        shouldDehydrateQuery: (query) => {
          if (query.state.status === 'error') {
            return redirect('/0/not-found');
          }
          return true;
        },
      })}
    >
      <InitialClientPage />
    </HydrationBoundary>
  );
}

export default Page;
