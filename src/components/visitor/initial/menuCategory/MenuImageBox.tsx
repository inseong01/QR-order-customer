import styles from '@/style/visitor/initial/Menu.module.css';
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
    <div className={styles.imgBox}>
      <div className={styles.tag}>
        <span className={styles.title}>{tagDescription}</span>
      </div>
      <Image
        src={`https://onofrsiptqngmwfzenlr.supabase.co/storage/v1/object/public/qr-order-img/${url}`}
        alt={name}
        width={100}
        height={60}
        placeholder="blur"
        blurDataURL={`https://onofrsiptqngmwfzenlr.supabase.co/storage/v1/object/public/qr-order-img/${url}`}
        style={{
          objectFit: 'cover',
          filter: tag === 'soldout' ? 'opacity(0.5)' : 'opacity(1)',
        }}
      />
    </div>
  );
}
