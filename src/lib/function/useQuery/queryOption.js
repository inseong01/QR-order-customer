import getCategoryList from "@/lib/supabase/function/getCategoryList";
import getMenuList from "@/lib/supabase/function/getMenuList";

import { queryOptions } from "@tanstack/react-query";

export const menuListQueryOption = queryOptions({
  queryKey: ['menuList'],
  queryFn: getMenuList,
  // 공통 옵션 생성 가능 
});

export const categoryListQueryOption = queryOptions({
  queryKey: ['category'],
  queryFn: () => getCategoryList('menu'),
  // 공통 옵션 생성 가능
});

export const requestListQueryOption = queryOptions({
  queryKey: ['request'],
  queryFn: () => getCategoryList('request'),
  // 공통 옵션 생성 가능
});