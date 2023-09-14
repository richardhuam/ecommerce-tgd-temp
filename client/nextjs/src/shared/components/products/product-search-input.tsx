import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { DEFAULT_QUERY_PAGE } from '@/shared/constants';
import { useProduct } from '@/shared/contexts/product.context';

import Button from '../ui/button';

type SearchValues = {
  searchInput: string;
};

export default function ProductSearchInput() {
  const router = useRouter();
  const { closeProductSearchDrawer } = useProduct();

  const { register, handleSubmit, setValue } = useForm<SearchValues>();

  const { productSearch } = useProduct();

  async function onSubmit(value: SearchValues) {
    try {
      const keyWord = value.searchInput;
      const page = DEFAULT_QUERY_PAGE;

      if (!keyWord) return;

      router.push(
        {
          pathname: `/products/search/[productSearchSlug]`,
          query: {
            page,
          },
        },
        `/products/search/${keyWord}?page=${page}`,
        /*  { shallow: true }, */
      );
      closeProductSearchDrawer();
      productSearch.setPage(1);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!productSearch.keyWord) return;
    setValue('searchInput', productSearch.keyWord);
  }, [setValue, productSearch.keyWord]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-end justify-center w-full gap-2">
        <div className="w-full">
          <label htmlFor="Search Products" />
          <input
            placeholder="Search .."
            className="text-14 border-gray-300 text-gray-800 outline-primary rounded-md border-1 py-2.5 px-3.5 hover:border-black transition-all w-full"
            {...register('searchInput')}
          />
        </div>
        <div>
          <Button type="submit" className="h-[43px]">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
