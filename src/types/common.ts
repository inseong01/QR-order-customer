import { Tables } from '@/lib/supabase/database.types';

export type LoadingType = 'link' | 'init' | '';

// supabase
export type MenuList = Tables<'qr-order-menu'>;
export type MenuCategoryList = Tables<'qr-order-category-menu'>;
export type RequestCategoryList = Tables<'qr-order-category-request'>;
export type TableList = Tables<'qr-order-table-list'>;
export type CategoryType = 'menu' | 'request';

export type OrderList = {
  id: string;
  orderList: [
    {
      id: number;
      name: string;
      price: number;
      amount: number;
    }
  ];
  created_at: Date;
};
export type CategoryList<T> = T extends 'menu' ? MenuCategoryList[] : RequestCategoryList[];
