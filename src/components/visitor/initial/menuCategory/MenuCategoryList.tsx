import { CategoryList } from '@/types/common';
import MenuCategory from './MenuCategory';

import { useQueryClient } from '@tanstack/react-query';

export default function MenuCategoryList() {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData<CategoryList<'menu'>>(['menuCategory']);

  return (
    <>
      {categoryList
        ?.filter((list) => list.id !== 0)
        .map((category, idx) => {
          return <MenuCategory key={idx} category={category} />;
        })}
    </>
  );
}
