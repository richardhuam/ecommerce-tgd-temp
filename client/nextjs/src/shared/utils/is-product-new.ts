export function isNewProduct(date: string) {
  const currentDate = new Date();
  const productDate = new Date(date);

  // Calculate the difference in days
  const timeDifference = Math.abs(currentDate.getTime() - productDate.getTime());
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Define the threshold for considering a product as new (e.g., 30 days)
  const newThreshold = 30;

  return daysDifference <= newThreshold;
}
