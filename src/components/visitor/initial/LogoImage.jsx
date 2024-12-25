import Image from 'next/image';

function LogoImage() {
  return (
    <li>
      <Image src={'/img/qr-order-icon.webp'} alt="qr order" width={88} height={15} />
    </li>
  );
}

export default LogoImage;
