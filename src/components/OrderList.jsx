'use client';

import BillList from './visitor/bill/BillList';
import AllOfOrderList from './visitor/order/AllOfOrderList';
import CurrentOrderList from './visitor/pickUp/CurrentOrderList';

export default function OrderList({ type, listData = undefined }) {
  switch (type) {
    case 'AllOforderList': {
      return <AllOfOrderList listData={listData} />;
    }
    case 'currentOrderList': {
      return <CurrentOrderList />;
    }
    case 'bill': {
      return <BillList />;
    }
  }
}
