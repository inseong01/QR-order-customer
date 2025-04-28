import LogoImage from '@/components/visitor/initial/LogoImage';
import { Metadata } from 'next';

import { cookies } from 'next/headers';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `404 : Not found`,
    description: `페이지가 존재하지 않습니다.`,
    metadataBase: new URL(`https://qr-order-client.vercel.app/0/not-found`),
  };
}

export default async function NotFound() {
  return (
    <main className={'w-full h-full bg-[#fafdff] text-[#3273b5] cursor-default'}>
      <div
        className={
          'w-full h-full flex flex-col justify-between text-left p-6 max-w-[450px] m-auto'
        }
      >
        <div className={'h-[90%] gap-12 justify-center flex flex-col'}>
          <TopContext />
          <BottomContext />
        </div>
        <div className={'justify-end items-end h-[10%] flex flex-col'}>
          <LogoImage />
        </div>
      </div>
    </main>
  );
}

function TopContext() {
  return (
    <div className={'flex flex-col gap-3'}>
      <h1>404 &#x003A;&#x0028;</h1>
      <div className={'w-full text-2xl font-bold leading-8 break-keep'}>
        <p>페이지가</p>
        <p>존재하지 않아요.</p>
      </div>
    </div>
  );
}

async function BottomContext() {
  const cookie = await cookies();
  const table = cookie.get('table');
  /*
    쿠키 값
    : 미들웨어 검증을 통해 정상 형태(정수) 

    쿠키 X
    - 홈페이지 이동
    쿠키 O
    - 원래 테이블 이동
  */
  const link = table?.value ? `/${table.value}` : '/';
  return (
    <div className={'text-xs'}>
      <div>
        <Link
          href={link}
          className={'inline-block text-[#5486b7] py-1 xl:hover:underline'}
        >
          돌아가기
        </Link>
      </div>
    </div>
  );
}
