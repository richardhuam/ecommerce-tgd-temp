export interface UserAddressModel {
	street: string;
	city: string;
	state: string;
	zip: string;
	country: {
		code: string;
		name: string;
	};
}

export interface CustomerAddressModel {
	billingAddress: UserAddressModel;
	deliveryAddress: UserAddressModel;
}
