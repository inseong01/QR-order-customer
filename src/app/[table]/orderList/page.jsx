import styles from '@/style/visitor/orderList/OrderListPage.module.css';
import AppVisitorHeader from '@/components/AppVisitorHeader';
import OrderListPageBox from '@/components/visitor/order/OrderListPageBox';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';
import getTableOrderList from '@/lib/supabase/function/getTableOrderList';

import { dehydrate, HydrationBoundary, queryOptions } from '@tanstack/react-query';

export default async function OrderListPage({ params }) {
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
        <AppVisitorHeader title={'주문내역'} />
        <main className={styles.main}>
          <OrderListPageBox />
        </main>
      </div>
    </HydrationBoundary>
  );
}
