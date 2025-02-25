'use client';

import { OrderListType, OrderListComponentType } from '@/types/common';
import BillList from './visitor/bill/BillList';
import AllOfOrderList from './visitor/order/AllOfOrderList';
import CurrentOrderList from './visitor/pickUp/CurrentOrderList';

export default function OrderList({
  type,
  listData = undefined,
}: {
  type: OrderListComponentType;
  listData?: OrderListType[];
}) {
  switch (type) {
    case 'AllOforderList': {
      if (listData) {
        return <AllOfOrderList listData={listData} />;
      }
    }
    case 'currentOrderList': {
      return <CurrentOrderList />;
    }
    case 'bill': {
      return <BillList />;
    }
  }
}
