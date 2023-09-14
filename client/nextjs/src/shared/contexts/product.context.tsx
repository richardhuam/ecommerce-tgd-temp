import { useRouter } from 'next/router';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import { getSlugFirstParam } from '@/shared/utils/get-product-sku-from-slug';

type ProductProviderProps = {
  children: React.ReactNode;
};

export type ProductSearchProps = {
  page: number;
  keyWord: string;
  setPage: Dispatch<SetStateAction<number>>;
  handleProductSearchPageChange: (page: number) => void;
};

const ProductContext = createContext(
  {} as {
    productSearch: ProductSearchProps;
    productSkuFromSlug: string;
    isProductSearchResultMenuOpen: boolean;
    isProductSearchDrawerOpen: boolean;
    openProductSearchResultMenu: () => void;
    closeProductSearchResultMenu: () => void;
    toggleProductSearchMenu: () => void;
    openProductSearchDrawer: () => void;
    closeProductSearchDrawer: () => void;
    toggleProductSearchDrawer: () => void;
  },
);

export function ProductProvider({ children }: ProductProviderProps) {
  const router = useRouter();
  const queryKeyWord = (router.query?.productSearchSlug as string) || '';
  const queryPageNumber = Number(router.query?.page) ?? 1;
  const [productSearchPage, setProductSearchPage] = useState<number>(queryPageNumber);

  /* Product Search result options */
  const [isProductSearchResultMenuOpen, setIsProductSearchResultMenuOpen] = useState<boolean>(true);

  function openProductSearchResultMenu() {
    setIsProductSearchResultMenuOpen(true);
  }

  function closeProductSearchResultMenu() {
    setIsProductSearchResultMenuOpen(false);
  }

  function toggleProductSearchMenu() {
    setIsProductSearchResultMenuOpen(prev => !prev);
  }

  /* Product Search State */
  const [isProductSearchDrawerOpen, setIsProductSearchDrawerOpen] = useState<boolean>(false);

  function openProductSearchDrawer() {
    setIsProductSearchDrawerOpen(true);
  }

  function closeProductSearchDrawer() {
    setIsProductSearchDrawerOpen(false);
  }

  function toggleProductSearchDrawer() {
    setIsProductSearchDrawerOpen(prevState => !prevState);
  }

  const productSearch = {
    page: productSearchPage,
    keyWord: queryKeyWord,
    setPage: setProductSearchPage,
    handleProductSearchPageChange,
  };

  function handleProductSearchPageChange(page: number) {
    setProductSearchPage(page);
  }

  const productSkuFromSlug =
    router.pathname === '/products/[productSlug]' ? getSlugFirstParam(router.query.productSlug) : 'you are not in product-slug-page';

  return (
    <ProductContext.Provider
      value={{
        productSearch,
        isProductSearchResultMenuOpen,
        openProductSearchResultMenu,
        closeProductSearchResultMenu,
        toggleProductSearchMenu,
        productSkuFromSlug,
        isProductSearchDrawerOpen,
        openProductSearchDrawer,
        closeProductSearchDrawer,
        toggleProductSearchDrawer,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
