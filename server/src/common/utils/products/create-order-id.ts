import * as uniqid from 'uniqid';

export const OrderIdPrefix = 'or';

export function createOrderId() {
	const uniqueId = uniqid();

	const trackingNumber = `${OrderIdPrefix}${uniqueId}`.toLowerCase();
	return trackingNumber;
}
