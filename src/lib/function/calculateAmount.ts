export default function calculateAmount(amount: number, num: number) {
  const currentAmount = amount;
  const receivedAmount = Number(num);
  let calcedAmount = currentAmount + receivedAmount;
  calcedAmount = Math.max(1, calcedAmount);

  return calcedAmount;
}
