import { useMutation, useQuery } from '@tanstack/react-query';

import { ProductService } from '@/shared/services/product/product.service';
import {
  IGetBestSellersApiParams,
  IGetNewArrivalsApiParams,
  IGetTrendingProductsApiParams,
  ISearchProductsApiParams,
} from '@/shared/services/product/product.service.types';

export const productKeys = {
  all: ['product'] as const,
  limitedBestSellers: () => [...productKeys.all, 'best-sellers'] as const,
  limitedNewArrivals: () => [...productKeys.all, 'new-arrivals'] as const,
  limitedTrendingProducts: () => [...productKeys.all, 'trending-products'] as const,
  bestSellers: ({ page }: IGetBestSellersApiParams) => [...productKeys.limitedBestSellers(), { page }] as const,
  newArrivals: ({ page }: IGetNewArrivalsApiParams) => [...productKeys.limitedNewArrivals(), { page }] as const,
  trendingProducts: ({ page }: IGetTrendingProductsApiParams) => [...productKeys.limitedTrendingProducts(), { page }] as const,
  productById: (productId: string) => [...productKeys.all, { id: productId }] as const,
  productBySku: (productSku: string) => [...productKeys.all, { sku: productSku }] as const,
  recommendedProducts: (productId: string) => [...productKeys.productById(productId), 'recommended'] as const,
  searchProducts: ({ keyWord, page }: ISearchProductsApiParams) => [...productKeys.all, 'search', { keyWord, page }] as const,
};

export const useGetLimitedBestSellers = () => {
  return useQuery(productKeys.limitedBestSellers(), ProductService.getLimitedBestSellers);
};

export const useGetLimitedNewArrivals = () => {
  return useQuery(productKeys.limitedNewArrivals(), ProductService.getLimitedNewArrivals);
};

export const useGetLimitedTrendingProducts = () => {
  return useQuery(productKeys.limitedTrendingProducts(), ProductService.getLimitedTrendingProducts);
};

export const useGetBestSellers = ({ page }: IGetBestSellersApiParams) => {
  return useQuery(productKeys.bestSellers({ page }), () => ProductService.getBestSellers({ page }));
};

export const useGetNewArrivals = ({ page }: IGetNewArrivalsApiParams) => {
  return useQuery(productKeys.newArrivals({ page }), () => ProductService.getNewArrivals({ page }));
};

export const useGetTrendingProducts = ({ page }: IGetTrendingProductsApiParams) => {
  return useQuery(productKeys.trendingProducts({ page }), () => ProductService.getTrendingProducts({ page }));
};

export const useGetProductById = (productId: string) => {
  return useQuery(productKeys.productById(productId), () => ProductService.getProductById(productId));
};

export const useGetProductBySku = (productSKu: string) => {
  return useQuery(productKeys.productBySku(productSKu), () => ProductService.getProductBySku(productSKu), {
    keepPreviousData: true,
  });
};

export const useSearchProducts = ({ keyWord, page }: ISearchProductsApiParams) => {
  return useQuery(productKeys.searchProducts({ keyWord, page }), () => ProductService.searchProducts({ keyWord, page }), {
    keepPreviousData: true,
  });
};

export const useGetRecommendedProducts = (productId: string) => {
  return useQuery(productKeys.recommendedProducts(productId), () => ProductService.getRecommendedProducts(productId));
};

export const useViewProduct = () => {
  return useMutation((productId: string) => ProductService.viewProduct(productId));
};
