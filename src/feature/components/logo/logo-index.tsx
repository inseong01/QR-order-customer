import Image from "next/image";

export default function LogoImage() {
  return (
    <li className="inline-block h-auto w-auto">
      <Image
        src={"/img/qr-order-icon.webp"}
        alt="qr order"
        width={88}
        height={15}
        priority={true}
      />
    </li>
  );
}
