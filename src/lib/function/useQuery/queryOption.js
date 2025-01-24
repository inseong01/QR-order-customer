import getCategoryList from "@/lib/supabase/function/getCategoryList";
import getMenuList from "@/lib/supabase/function/getMenuList";
import getTableOrderList from "@/lib/supabase/function/getTableOrderList";

import { queryOptions } from "@tanstack/react-query";

export const menuListQueryOption = queryOptions({
  queryKey: ['menuList'],
  queryFn: getMenuList,
  // 관리자 메뉴 상태 갱신 고려 
  staleTime: 1000 * 10,
  retry: 2,
  meta: {
    errorMessage: '메뉴 목록을 불러오는데 실패하였습니다.'
  }
});

export const categoryListQueryOption = queryOptions({
  queryKey: ['category'],
  queryFn: () => getCategoryList('menu'),
  // 신선도 유지 
  staleTime: Infinity,
  retry: 2,
  meta: {
    errorMessage: '카테고리 목록을 불러오는데 실패하였습니다.'
  }
});

export const requestListQueryOption = queryOptions({
  queryKey: ['request'],
  queryFn: () => getCategoryList('request'),
  // 신선도 유지 
  staleTime: Infinity,
  retry: 1,
  meta: {
    errorMessage: '요청사항 목록을 불러오는데 실패하였습니다.'
  }
});

export const orderListQueryOption = (tablNum) => queryOptions({
  queryKey: ['orderList'],
  queryFn: () => getTableOrderList(tablNum),
  // 신선도 유지, 주문 이후 리패치 
  staleTime: Infinity,
  retry: 1,
  meta: {
    errorMessage: '주문 목록을 불러오는데 실패하였습니다.'
  }
})