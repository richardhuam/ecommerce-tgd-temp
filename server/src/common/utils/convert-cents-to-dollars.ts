export function centsToDollars(cents: number): string {
	const dollars = cents / 100;
	return dollars.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
