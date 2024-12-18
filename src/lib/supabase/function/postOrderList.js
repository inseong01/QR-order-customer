import supabase from "../supabaseConfig";

export default async function postOrderList(orderList, tableNum) {
  const response = await supabase.from('qr-order-allOrderList').insert({ orderList, tableNum }).eq('tableNum', tableNum).select();
  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }
  return response;
}