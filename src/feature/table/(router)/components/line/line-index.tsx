export default function Divider({
  borderColor = "border-[#c9c9c9]",
}: {
  borderColor?: string;
}) {
  return <span className={`h-[1px] w-full border-[1px] ${borderColor}`}></span>;
}
