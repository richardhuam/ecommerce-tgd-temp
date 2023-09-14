export const envService = () => ({
  nodeEnv: process.env.NODE_ENV,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  clientBaseUrl: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
  productImageUrl: process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL,
  productCategoryImagesUrl: process.env.NEXT_PUBLIC_PRODUCT_CATEGORIES_IMAGES_PATH,
  demo: {
    loginEmail: process.env.NEXT_PUBLIC_TEST_USER_EMAIL,
    loginPassword: process.env.NEXT_PUBLIC_TEST_USER_PASSWORD,
  },
});
