import { envConfig } from '@/config/environment.config';

export const categoryImageUrlResolver = (path: string) => {
  const categoryPath = envConfig().aws.s3.productCategoryUrl;
  return `${categoryPath}/${path}`;
};
