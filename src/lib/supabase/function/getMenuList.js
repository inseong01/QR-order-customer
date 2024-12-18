import supabase from "../supabaseConfig";

export default async function getMenuList() {
  const response = await supabase.from('qr-order-menu').select('*')
  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message)
  }
  return response.data;
}