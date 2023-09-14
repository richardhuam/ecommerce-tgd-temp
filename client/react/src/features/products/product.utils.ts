import { envConfig } from '@/config/environment.config';

export const productImageUrlResolver = (path: string) => {
  const productPath = envConfig().aws.s3.productUrl;
  return `${productPath}/${path}`;
};
