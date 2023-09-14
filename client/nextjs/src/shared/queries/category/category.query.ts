import { useQuery } from '@tanstack/react-query';

import { CategoryService } from '@/shared/services/category/category.service';

export const categoryKeys = {
  all: ['category'] as const,
  categories: () => [...categoryKeys.all, 'all-categories'] as const,
  categoryById: (categoryId: string) => [...categoryKeys.all, categoryId] as const,
  productsByCategoryId: (categoryId: string) => [...categoryKeys.all, 'products-by-category-id', categoryId] as const,
};

export const useGetAllCategories = () => {
  return useQuery(categoryKeys.categories(), CategoryService.getAllCategories);
};

export const useGetCategoryById = (categoryId: string) => {
  return useQuery(categoryKeys.categoryById(categoryId), () => CategoryService.getCategoryById(categoryId));
};

export const useGetProductsByCategoryId = (categoryId: string) => {
  return useQuery(categoryKeys.productsByCategoryId(categoryId), () => CategoryService.getProductsByCategoryId(categoryId));
};
