import { Tables, TablesInsert } from '@/lib/supabase/database.types';
import { StateCreator } from 'zustand';

export type LoadingType = 'link' | 'init' | '';

// supabase
export type MenuList = Tables<'qr-order-menu'>;
export type MenuCategoryList = Tables<'qr-order-category-menu'>;
export type RequestCategoryList = Tables<'qr-order-category-request'>;
export type TableList = Tables<'qr-order-table-list'>;
export type InsertOrderList = TablesInsert<'qr-order-allOrderList'>;
export type InsertRequestList = TablesInsert<'qr-order-request-list'>;

// supabase variant
export type CategoryType = 'menu' | 'request';
export type TableOrderType = {
  id: string;
  orderList: OrderListType[];
  created_at: Date;
};
export type OrderListType = {
  id: string;
  name: string;
  price: number;
  amount: number;
};
export type CategoryList<T> = T extends 'menu' ? MenuCategoryList[] : RequestCategoryList[];

// variant
export type TagDescription = '인기' | '신규' | '품절' | '';
export type HeaderTitle = '주문' | '주문내역' | '직원호출' | '계산서';
export type IconType = 'arrow-left' | 'plus' | 'minus';
export type OrderListComponentType = 'AllOforderList' | 'currentOrderList' | 'bill';
export type CountButtonType = 'pick' | 'call' | 'pickUpList';
export type Status = '' | 'pending' | 'fulfilled' | 'rejected';
export type MsgType = 'error' | 'empty';
export type AllMenuObj = {
  [key: string]: {
    id: string;
    name: string;
    price: number;
    amount: number;
  };
};

// zustand
export type SliceCreator<T> = StateCreator<T, [['zustand/devtools', never]], [], T>;
export type SelectedMenu = {
  name: string;
  price: number;
  amount: number;
  id: string;
};
export type CallItem = {
  id: number;
  title: string;
  amount: number;
};
export type ModalType = 'orderCheck' | 'request' | '';

// next
export type Params = Promise<{ table: string }>;
