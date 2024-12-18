import supabase from "../supabaseConfig";

export default async function getTableOrderList(tableNum) {
  const response = await supabase.from('qr-order-table-list').select('*').eq('tableNum', tableNum);
  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }
  return response.data;
}