export default function calculateAmount(amount, num) {
  const currentAmount = amount;
  const receivedAmount = Number(num);
  let calcedAmount = currentAmount + receivedAmount
  if (calcedAmount <= 0) calcedAmount = 1;
  return calcedAmount;
}