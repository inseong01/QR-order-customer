import { Tables } from '@/lib/supabase/database.types';
import { StateCreator } from 'zustand';

export type LoadingType = 'link' | 'init' | '';

// supabase
export type MenuList = Tables<'qr-order-menu'>;
export type MenuCategoryList = Tables<'qr-order-category-menu'>;
export type RequestCategoryList = Tables<'qr-order-category-request'>;
export type TableList = Tables<'qr-order-table-list'>;

export type CategoryType = 'menu' | 'request';
export type TableOrderType = {
  id: string;
  orderList: OrderListType[];
  created_at: Date;
};
export type OrderListType = {
  id: number;
  name: string;
  price: number;
  amount: number;
};
export type CategoryList<T> = T extends 'menu' ? MenuCategoryList[] : RequestCategoryList[];

// query
export type GetQueryState<T> = {
  data: T;
  dataUpdateCount: number;
  dataUpdatedAt: number;
  error: null | string;
  errorUpdateCount: number;
  errorUpdatedAt: number;
  fetchFailureCount: number;
  fetchFailureReason: null | string;
  fetchMeta: null | any;
  isInvalidated: boolean;
  status: string;
  fetchStatus: string;
};

// variant
export type TagDescription = '인기' | '신규' | '품절' | '';
export type HeadTitle = '주문';
export type IconType = 'arrow-left' | 'plus' | 'minus';
export type OrderListComponentType = 'AllOforderList' | 'currentOrderList' | 'bill';
export type CountButtonType = 'pick' | 'call' | 'pickUpList';
export type Status = '' | 'pending' | 'fulfilled' | 'rejected';

// zustand
export type SliceCreator<T> = StateCreator<T, [['zustand/devtools', never]], [], T>;
export type SelectedMenu = {
  name: string;
  price: string;
  amount: number;
  id: null | string;
};
export type CallItem = {
  id: number;
  title: string;
  amount: number;
};
export type ModalType = 'orderCheck' | 'request' | '';
