export default function calculateAmount(amount, num) {
  const currentAmount = amount;
  const receivedAmount = Number(num);
  let calcedAmount = currentAmount + receivedAmount
  calcedAmount = Math.max(1, calcedAmount);

  return calcedAmount;
}