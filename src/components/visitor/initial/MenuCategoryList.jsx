import { categoryListQueryOption } from '@/lib/function/useQuery/queryOption';
import MenuCategory from './MenuCategory';

import { useSuspenseQuery } from '@tanstack/react-query';

export default function MenuCategoryList() {
  // useSuspenseQuery
  const { data } = useSuspenseQuery(categoryListQueryOption);

  return (
    <>
      {data
        .filter((list) => list.id !== 0)
        .map((category, idx) => {
          return <MenuCategory key={idx} category={category} />;
        })}
    </>
  );
}
