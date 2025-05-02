import RowSpaceBetween from "../../../horizontal-stack/stack-between/between-index";

export default function Item({
  name,
  amount,
  price,
}: {
  name: string;
  amount: number;
  price: string;
}) {
  return (
    <RowSpaceBetween tag="li">
      <div>
        <span>{name}</span>
      </div>
      <div className={"flex items-center justify-end gap-2.5 text-right"}>
        <span>{amount}</span>x<span className="min-w-18">{price}원</span>
      </div>
    </RowSpaceBetween>
  );
}
