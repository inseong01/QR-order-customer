import styles from '@/style/visitor/bill/BillPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import getTableOrderList from '@/lib/supabase/function/getTableOrderList';
import OrderList from '@/components/OrderList';

import { dehydrate, HydrationBoundary, queryOptions } from '@tanstack/react-query';

export default async function BillPage({ params }) {
  const paramsObj = await params;
  // useQuery prefetch
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    queryOptions({
      queryKey: ['orderList'],
      queryFn: () => getTableOrderList(paramsObj.table),
      staleTime: 1000 * 1,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.wrap}>
        <AppVisitorHeader title={'계산서'} />
        <main className={styles.main}>
          <OrderList type={'bill'} />
        </main>
      </div>
    </HydrationBoundary>
  );
}
