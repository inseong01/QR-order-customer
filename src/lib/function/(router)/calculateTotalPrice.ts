export function calculateTotalPrice<
  T extends { price: number; amount: number },
>(prev: number, current: T) {
  return prev + current.price * current.amount;
}
