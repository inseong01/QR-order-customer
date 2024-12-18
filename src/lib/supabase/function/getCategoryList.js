import supabase from "../supabaseConfig";

export default async function getCategoryList(type) {
  const response = await supabase.from(`qr-order-category-${type}`).select('*').order('id', { ascending: true });
  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message)
  }
  return response.data;
}