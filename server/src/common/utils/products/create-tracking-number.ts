import * as uniqid from 'uniqid';

export const trackingNumberPrefix = 'tk';

export function createTrackingNumber() {
	const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	const currentDate = new Date();

	const uniqueId = uniqid();
	const formattedDate = months[currentDate.getMonth()] + (currentDate.getFullYear() % 100);

	const trackingNumber = `${trackingNumberPrefix}${formattedDate}${uniqueId}`.toLowerCase();
	return trackingNumber;
}
