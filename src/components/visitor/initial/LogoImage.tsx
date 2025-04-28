import Image from 'next/image';

function LogoImage() {
  return (
    <li className='w-auto h-auto inline-block'>
      <Image
        src={'/img/qr-order-icon.webp'}
        alt='qr order'
        width={88}
        height={15}
        priority={true}
      />
    </li>
  );
}

export default LogoImage;
