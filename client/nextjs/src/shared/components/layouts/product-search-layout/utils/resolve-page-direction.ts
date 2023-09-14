import { NextRouter } from 'next/router';

import { ProductSearchProps } from '@/shared/contexts/product.context';

type ResolvePageDirectionProps = {
  router: NextRouter;
  direction: 'prev' | 'next';
  productSearch: ProductSearchProps;
};

interface SetDefaultQueryPageProps extends Omit<ResolvePageDirectionProps, 'direction'> {}

export function resolvePageDirection({ router, direction, productSearch }: ResolvePageDirectionProps): 'prev' | 'next' {
  const pageInit = direction === 'next' ? productSearch.page - 1 : productSearch.page + 1;
  router.push(
    {
      pathname: router.pathname,
      query: {
        page: pageInit,
      },
    },
    `/products/search/${productSearch.keyWord}?page=${pageInit}`,
    { shallow: true },
  );
  return direction;
}

export function setDefaultQueryPage({ router, productSearch }: SetDefaultQueryPageProps): void {
  router.push(
    {
      pathname: router.pathname,
      query: {
        page: 1,
      },
    },
    `/products/search/${productSearch.keyWord}?page=${1}`,
    { shallow: true },
  );
  productSearch.setPage(1);
}
