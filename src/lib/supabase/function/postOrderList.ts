import { SelectedMenu } from '@/types/common';
import supabase from '../supabaseConfig';

export default async function postOrderList(tableName: number, orderList: SelectedMenu[]) {
  const response = await supabase
    .from('qr-order-allOrderList')
    .insert({ orderList, tableNum: tableName })
    .select();
  if (response.error) {
    const msg = response.error.message ?? '주문이 정상적으로 처리되지 않았습니다.';
    console.error(msg);
    // 조건문을 통해 에러를 판별, 에러 던지지 않음
    return { error: { message: msg } };
  }
  return response;
}
