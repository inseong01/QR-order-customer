import supabase from "../supabaseConfig";

export default async function getTableOrderList(tableNum) {
  const response = await supabase.from('qr-order-table-list').select('*').eq('tableNum', tableNum);
  if (response.error) {
    const msg = response.error.message ?? 'GetTableOrderList Error'
    if (process.env.NODE_ENV === 'development') console.error(msg);
    throw new Error(msg);
  }
  return response.data;
}