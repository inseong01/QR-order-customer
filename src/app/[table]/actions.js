'use server'

import { cookies } from "next/headers";

export async function setInitCookies({ table }) {
  // 테이블 번호 쿠기 보관
  const cookieStore = await cookies();
  cookieStore.set('table', table, { httpOnly: true, secure: true });
}