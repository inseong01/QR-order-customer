import { TableList } from "@/types/common";
import supabase from "../supabase-config";

export default async function getTableOrderList(
  tableName: string,
): Promise<TableList[]> {
  const response = await supabase
    .from("qr-order-table-list")
    .select("*")
    .eq("tableNum", tableName);
  if (response.error) {
    const msg = response.error.message ?? "GetTableOrderList Error";
    if (process.env.NODE_ENV === "development") console.error(msg);
    throw new Error(msg);
  }
  return response.data;
}
