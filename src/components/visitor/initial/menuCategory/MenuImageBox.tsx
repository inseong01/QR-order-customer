import { MenuList, TagDescription } from '@/types/common';

import Image from 'next/image';

export default function MenuImageBox({
  list,
  tagDescription,
}: {
  list: MenuList;
  tagDescription: TagDescription;
}) {
  const { name, tag, url } = list;

  return (
    <div
      className={
        'w-24 h-16 rounded relative bg-[#989898] cursor-pointer overflow-hidden border-[1px] border-[#e7e7e7]'
      }
    >
      <div className={'w-8 h-4 absolute flex justify-center items-center rounded-br-lg'}>
        <span className={'text-white text-xs'}>{tagDescription}</span>
      </div>
      <Image
        src={`https://onofrsiptqngmwfzenlr.supabase.co/storage/v1/object/public/qr-order-img/${url}`}
        alt={name}
        width={100}
        height={60}
        placeholder='blur'
        blurDataURL={`https://onofrsiptqngmwfzenlr.supabase.co/storage/v1/object/public/qr-order-img/${url}`}
        style={{
          objectFit: 'cover',
          filter: tag === 'soldout' ? 'opacity(0.5)' : 'opacity(1)',
        }}
      />
    </div>
  );
}
