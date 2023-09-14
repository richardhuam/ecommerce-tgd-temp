import { envConfig } from '@config/environment';
import Stripe from 'stripe';

export const stripeClient = new Stripe(envConfig().stripe.secretKey, {
	apiVersion: '2022-11-15',
	typescript: true,
});
