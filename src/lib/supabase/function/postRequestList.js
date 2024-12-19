import supabase from "../supabaseConfig";

export default async function postRequestList(tableNum, requestList) {
  const response = await supabase.from('qr-order-request-list').insert({ tableNum, requestList }).select();
  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }
  return response;
}