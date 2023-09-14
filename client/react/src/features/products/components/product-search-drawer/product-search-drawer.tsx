import Drawer from '@/features/ui/drawer';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { ProductActions } from '../../redux/product.slice';
import ProductSearchInput from './product-search-input';

export default function ProductSearchDrawer() {
  const dispatch = useAppDispatch();
  const { isProductSearchDrawerOpen } = useAppSelector(store => store.product);

  return (
    <Drawer
      open={isProductSearchDrawerOpen}
      direction="top"
      onClose={() => dispatch(ProductActions.closeProductSearchDrawer())}
      duration={300}
      className="!w-full !h-auto"
    >
      <div className="main-container p-3 md:p-4">
        <p className="mb-2 text-[15px] md:text-[16px] lg:text-[18px] font-medium text-center text-gray-800">
          Find everything you need 🎉
        </p>
        <ProductSearchInput />
      </div>
    </Drawer>
  );
}
