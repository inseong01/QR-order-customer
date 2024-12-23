'use client';
import { getQueryClient } from '@/lib/function/useQuery/getQueryClient';

import { QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({ children }) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
