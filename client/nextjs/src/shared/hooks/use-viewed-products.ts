import { useEffect, useState } from 'react';

import { localStorageKey } from '@/config/localstorage-keys';

export function useViewedProducts() {
  const [viewedProducts, setViewedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedViewedProducts = localStorage.getItem(localStorageKey.viewedProducts);

    if (storedViewedProducts) {
      setViewedProducts(JSON.parse(storedViewedProducts));
    }

    setLoading(false);
  }, []);

  function markProductAsViewed(productId: string) {
    setViewedProducts(prevViewedProducts => {
      const updatedProducts = [...prevViewedProducts, productId];
      localStorage.setItem(localStorageKey.viewedProducts, JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  }

  return {
    viewedProducts,
    markProductAsViewed,
    loading,
  };
}
