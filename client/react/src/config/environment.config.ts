export function envConfig() {
  return {
    mode: import.meta.env.MODE,
    clientBaseUrl: import.meta.env.VITE_CLIENT_BASE_URL,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    aws: {
      s3: {
        productUrl: import.meta.env.VITE_PRODUCT_IMAGE_URL,
        productCategoryUrl: import.meta.env.VITE_PRODUCT_CATEGORIES_IMAGES_PATH,
      },
    },
  };
}
