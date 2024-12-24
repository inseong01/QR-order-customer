import RequestList from './RequestList';
import { requestListQueryOption } from '@/lib/function/useQuery/queryOption';

import { AnimatePresence } from 'motion/react';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function RequestListWrap() {
  // useQuery
  const { data } = useSuspenseQuery(requestListQueryOption);

  return <AnimatePresence>{data && <RequestList data={data} />}</AnimatePresence>;
}
