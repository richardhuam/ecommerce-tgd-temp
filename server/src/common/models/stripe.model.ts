import Stripe from 'stripe';

export type IStripeSessionResponse = Stripe.Response<Stripe.Checkout.Session>;

export interface IStripeCreateSession {
	id: string;
	object: string;
	after_expiration: null | any;
	allow_promotion_codes: null | any;
	amount_subtotal: number;
	amount_total: number;
	automatic_tax: {
		enabled: boolean;
		status: null | any;
	};
	billing_address_collection: null | any;
	cancel_url: string;
	client_reference_id: null | any;
	consent: null | any;
	consent_collection: null | any;
	created: number;
	currency: string;
	currency_conversion: null | any;
	custom_fields: any[];
	custom_text: {
		shipping_address: null | any;
		submit: null | any;
	};
	customer: null | any;
	customer_creation: 'if_required' | any;
	customer_details: null | any;
	customer_email: null | any;
	expires_at: number;
	invoice: null | any;
	invoice_creation: {
		enabled: boolean;
		invoice_data: {
			account_tax_ids: null | any;
			custom_fields: null | any;
			description: null | any;
			footer: null | any;
			metadata: Record<string, any>;
			rendering_options: null | any;
		};
	};
	livemode: boolean;
	locale: null | any;
	metadata: Record<string, any>;
	mode: 'payment';
	payment_intent: null | any;
	payment_link: null | any;
	payment_method_collection: 'always';
	payment_method_options: Record<string, any>;
	payment_method_types: string[];
	payment_status: 'unpaid';
	phone_number_collection: {
		enabled: boolean;
	};
	recovered_from: null | any;
	setup_intent: null | any;
	shipping_address_collection: null | any;
	shipping_cost: null | any;
	shipping_details: null | any;
	shipping_options: any[];
	status: 'open';
	submit_type: null | any;
	subscription: null | any;
	success_url: string;
	total_details: {
		amount_discount: number;
		amount_shipping: number;
		amount_tax: number;
	};
	url: string;
}
