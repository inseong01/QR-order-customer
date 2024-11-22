'use client';

import InitialClientPage from '@/components/visitor/InitialClientPage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function Page() {
  // Query
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <InitialClientPage />
    </QueryClientProvider>
  );
}

export default Page;
