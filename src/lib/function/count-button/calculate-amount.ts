export default function calculateAmount(amount: number, num: number) {
  const currentAmount = amount;
  const receivedAmount = num;
  const totalAmount = currentAmount + receivedAmount;
  const limitedAmount = Math.max(1, totalAmount);

  return limitedAmount;
}
