import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export function middleware(request) {
  // console.log('request', request)
  let cookie = request.cookies.get('table');
  // 1. 모바일 접속만 허가, 서버에서 기기 판별, 개발모드 접근성 낮춤  

  // 2. /[table] 링크 접속만 허가, 서버에서 쿠키 판별: 전역 상태 사용 어려움, 링크 직접 연결 방지
  // -> 쿠키 값과 pathname이 일치해야 진행
  //    자리변경 고려, /[table] 이동 간 허용
  //      - /2/bill -> /3/bill 이동 제한
  //      - /2 -> /3 -> /3/bill 가능
  // 2.1 pathname
  const pathname = request.nextUrl.pathname
  // 2.2 tableNum
  const pathnameTableNum = pathname.split('/')[1]
  const cookieTableNum = cookie.value
  // 2.3 비교
  const isSubPage = pathname.split('/').length > 2; // ['', (tableNum), (subpage)]
  // 하위 페이지가 아니면 링크 이동 허용
  if (!isSubPage) return NextResponse.next()
  // tableNum 일치하지 않으면 링크 이동 제한
  if (pathnameTableNum !== cookieTableNum) {
    const url = new URL('/not-found', request.nextUrl.origin)
    console.log('url', url)
    return NextResponse.redirect(url)
    // return notFound()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon|img).*)'], // url 경로만 매치
}