import Image from 'next/image';

function LogoImage() {
  return (
    <li style={{ width: 88, height: 20 }}>
      <Image src={'/img/qr-order-icon.webp'} alt="qr order" width={88} height={15} priority={true} />
    </li>
  );
}

export default LogoImage;
