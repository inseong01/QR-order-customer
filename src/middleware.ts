import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

import { checkValidTableValue } from './lib/function/checkValidTableValue';

/*
  1. 모바일 접속만 허가
    : 개발자 창 접근성 낮춤, production 전용  
 
  2. 시작 링크 설정
    [ 링크 이동 조건 ]
    : 링크와 쿠키의 table 값이 일치, 하위경로 접속자 번거로움 제공

    예외) 
      - /[table] 링크 변경 접속: 자리변경 고려
      - / 접속: QR-order 홍보 페이지

    상황)
      - 이동 제한
        1. /2 -> /2/bill -> /3/bill (다른 테이블 접속) 
        2. /2/bill (하위경로 접속)

      - 이동 가능
        1. /2 -> /3 -> /3/bill (쿠기값 변경)

*/

export function middleware(request: NextRequest) {
  // dev
  const isDev = process.env.NODE_ENV === 'development';
  // home uri
  const HomePage = new URL(`/`, request.nextUrl.origin);
  // not-found uri
  const notFoundPage = new URL(`/0/not-found`, request.nextUrl.origin);

  // 링크 값
  const pathname = request.nextUrl.pathname.split('/'); // ['', (tableName), (subpage)]
  const tablePathname = pathname[1];

  // not fouud 페이지 접속 판별
  if (pathname[2] === 'not-found') {
    return NextResponse.next();
  }

  // 홈페이지 접속 판별
  if (tablePathname === '') {
    return NextResponse.next();
  }

  // 접속 장치 유형
  const { device } = userAgent(request);

  // 장치 판별
  const isMobile = device.type === 'mobile' || device.type === 'tablet';

  // 장치 별 페이지 접근 제한
  if (!isMobile && !isDev) {
    console.log('device', typeof device.type);
    return NextResponse.redirect(HomePage);
  }

  // 링크 테이블 값 유형 검증
  const isWrongTableValue = checkValidTableValue(tablePathname);

  // 잘못된 테이블 값, 홈페이지 이동
  if (isWrongTableValue) return NextResponse.redirect(HomePage);

  // 하위 페이지 접속 판별
  const isSubPage = pathname.length > 2;

  // 하위 페이지 접속
  if (isSubPage) {
    // 부여된 테이블 쿠키 값
    const cookie = request.cookies.get('table');
    const cookieTableNum = cookie?.value;

    // 링크, 쿠키 값 검증
    if (tablePathname !== cookieTableNum) {
      return NextResponse.redirect(notFoundPage);
    }
  }

  // 하위 페이지가 아니면 링크 이동
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon|img).*)'], // url 경로만 매치
};
