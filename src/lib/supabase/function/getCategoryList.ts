import { CategoryList, CategoryType } from '@/types/common';
import supabase from '../supabaseConfig';

export default async function getCategoryList(type: CategoryType): Promise<CategoryList<CategoryType>> {
  const response = await supabase
    .from(`qr-order-category-${type}`)
    .select('*')
    .order('id', { ascending: true });
  if (response.error) {
    const msg = response.error.message ?? 'GetCategoryList Error';
    if (process.env.NODE_ENV === 'development') console.error(msg);
    throw new Error(response.error.message);
  }
  return response.data;
}
