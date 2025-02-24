import { MenuList } from '@/types/common';
import supabase from '../supabaseConfig';

export default async function getMenuList(): Promise<MenuList[]> {
  const response = await supabase.from('qr-order-menu').select('*');
  if (response.error) {
    const msg = response.error.message ?? 'GetMenuList Error';
    if (process.env.NODE_ENV === 'development') console.error(msg);
    throw new Error(response.error.message);
  }
  return response.data;
}
