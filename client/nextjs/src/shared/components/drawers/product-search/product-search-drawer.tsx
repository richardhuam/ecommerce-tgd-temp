import dynamic from 'next/dynamic';

import { useProduct } from '@/shared/contexts/product.context';

import ProductSearchInput from '../../products/product-search-input';

const Drawer = dynamic(() => import('@/shared/components/drawers/drawer'), { ssr: false });

export default function ProductSearchDrawer() {
  const { isProductSearchDrawerOpen, closeProductSearchDrawer } = useProduct();

  return (
    <Drawer open={isProductSearchDrawerOpen} direction="top" onClose={closeProductSearchDrawer} duration={300} className="!w-full !h-auto">
      <div className="main-container py-3 md:py-4">
        <p className="mb-2 text-15 md:text-16 lg:text-18 font-medium text-center text-gray-800">Find everything you need 🎉</p>
        <ProductSearchInput />
      </div>
    </Drawer>
  );
}
