import PickUpListPageWrap from '@/components/visitor/pickUp/PickUpListPageWrap';
import { Params } from '@/types/common';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { table } = await params;

  return {
    title: `주문`,
    description: `${table}번 테이블 주문 페이지입니다.`,
    metadataBase: new URL(`https://qr-order-client.vercel.app/${table}/pickUpList`),
  };
}

export default function PickUpListPage() {
  return <PickUpListPageWrap />;
}
