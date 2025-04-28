import LogoImage from '@/components/visitor/initial/LogoImage';

import Link from 'next/link';

export default function Home() {
  return (
    <main className={'w-full h-full bg-[#fafdff] text-[#3273b5] cursor-default'}>
      <div
        className={
          'w-full h-full flex flex-col justify-between text-left p-6 max-w-[450px] m-auto'
        }
      >
        <div className={`h-[90%] gap-12 justify-center flex flex-col`}>
          <TopContext />
          <BottomContext />
        </div>
        <div className={`justify-end items-end h-[10%] flex flex-col`}>
          <LogoImage />
        </div>
      </div>
    </main>
  );
}

function TopContext() {
  return (
    <div className={'flex flex-col gap-3'}>
      <h1 className='font-bold'>반갑습니다 &#x003A;&#x0029;</h1>
      <div className={'w-full text-2xl font-bold leading-8 break-keep'}>
        <p>주문의 간편함을 추구하는</p>
        <p>QR-ORDER 입니다.</p>
      </div>
      <div className={'text-xs text-[#5486b7]'}>
        <p>QR코드를 다시 스캔해주세요.</p>
        <br />
        <p>
          주문 서비스를 이용할 경우, <br /> 모바일 또는 태블릿으로 접속해주세요.
        </p>
      </div>
    </div>
  );
}

function BottomContext() {
  return (
    <div className={'text-xs'}>
      <p className='font-bold'>저장소 살펴보기</p>
      <div className='flex gap-3'>
        <Link
          href={'https://github.com/inseong01/QR-order-admin'}
          className={'inline-block text-[#5486b7] py-1 xl:hover:underline'}
          target='_blank'
        >
          관리자
        </Link>
        <Link
          href={'https://github.com/inseong01/QR-order-customer'}
          className={'inline-block text-[#5486b7] py-1 xl:hover:underline'}
          target='_blank'
        >
          고객
        </Link>
      </div>
    </div>
  );
}
