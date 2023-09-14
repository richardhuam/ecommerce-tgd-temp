export const envConfig = () => ({
	cors: {
		allowedUrl: process.env.ALLOWED_CORS_URL,
	},
	app: {
		host: process.env.HOST,
		port: process.env.PORT,
		environment: process.env.ENVIRONMENT,
	},
	client: {
		baseUrl: process.env.CLIENT_BASE_URL,
		successGoogleSession: process.env.CLIENT_SUCCESS_GOOGLE_SESSION,
		failureGoogleSession: process.env.CLIENT_FAILURE_GOOGLE_SESSION,
		continueWithGoogle: process.env.CLIENT_CONTINUE_WITH_GOOGLE,
		domain: process.env.CLIENT_DOMAIN_URL,
	},
	google: {
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackUrl: process.env.GOOGLE_CALLBACK_URL,
	},
	db: {
		uri: process.env.DB_URI,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiration: process.env.JWT_EXPIRATION_TIME,
	},
	stripe: {
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
		secretKey: process.env.STRIPE_SECRET_KEY,
		clientSuccessUrl: process.env.CLIENT_STRIPE_PAYMENT_SUCCESS,
		clientFailureUrl: process.env.CLIENT_STRIPE_PAYMENT_FAILURE,
	},
	aws: {
		s3: {
			projectName: process.env.AWS_PROJECT_NAME,
			bucketName: process.env.AWS_BUCKET_NAME,
			bucketRegion: process.env.AWS_BUCKET_REGION,
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			productImagesPath: process.env.AWS_PRODUCT_IMAGES_PATH,
			productCategoriesImagesPath: process.env.AWS_PRODUCT_CATEGORIES_IMAGES_PATH,
		},
	},
});
