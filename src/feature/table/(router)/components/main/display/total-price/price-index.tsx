import RowSpaceBetween from "../../../horizontal-stack/stack-between/between-index";

export default function DisplayTotalPrice({
  title,
  price,
}: {
  title: string;
  price: string;
}) {
  return (
    <RowSpaceBetween tag="div">
      <span>{title}</span>
      <span>{price}원</span>
    </RowSpaceBetween>
  );
}
