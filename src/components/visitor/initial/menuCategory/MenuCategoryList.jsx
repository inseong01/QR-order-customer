import MenuCategory from './MenuCategory';

import { useQueryClient } from '@tanstack/react-query';

export default function MenuCategoryList() {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(['category']);

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
