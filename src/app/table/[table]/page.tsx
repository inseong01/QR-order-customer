import TableInitPage from "feature/table/table-index";
import { getQueryClient } from "@/lib/function/useQuery/get-queryClient";
import {
  categoryListQueryOption,
  menuListQueryOption,
} from "@/lib/function/useQuery/query-option";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

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
          if (query.state.status === "error") {
            return redirect("/not-found");
          }
          return true;
        },
      })}
    >
      <TableInitPage />
    </HydrationBoundary>
  );
}

export default Page;
